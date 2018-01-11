# -*- coding: utf-8 -*-
import MySQLdb
from datetime import date
import os, sys, time
import pandas

con = MySQLdb.connect(host='localhost', user='root', passwd='', db='eu_parlamentar')
c = con.cursor()

separador = "*******************************************************************************"

def menu():
    print separador
    print "MENU\n"
    print "1 - Cadastrar Usuario"
    print "2 - Responder Questoes de Governo"
    print "3 - Encontrar Relacoes de Similaridade "
    print "4 - SAIR\n"
    opcao = raw_input("Escolha uma opcao: ")
    if opcao=="1":
        cadastrarUsuario()
        return 1
    elif opcao=="2":
        questoes()
        return 1
    elif opcao=="3":
        comparadorLocal()
        return 1
    else:
        return 0

def cadastrarUsuario():
    print separador
    print "CADASTRO DE USUARIO\n"
    estado  = consultarEstados()
    email   = raw_input("Seu e-mail: ").lower()

    verifica = c.execute("SELECT id_usuario FROM usuarios WHERE email='%s'" % (email))
    if verifica:
        print "ATENCAO - Usuario ja cadastrado anteriormente"
        print ""
    else:
        c.execute("INSERT INTO usuarios VALUES(NULL,'%s','%s')" % (email, estado))
        con.commit()
        print "Usuario inserido com sucesso"
        print ""

def consultarEstados():
    sql = "SELECT distinct estado FROM eu_parlamentar.deputados;"
    c.execute(sql)
    estados = c.fetchall()
    print ""
    while True:
        for estado in estados:
            print estados.index(estado),"-",estado[0]
        print ""
        break
    while True:
        opcao = int(raw_input("Seu Estado: "))
        if (opcao>=0 and opcao<=26):
            estado = estados[opcao][0]
            break
        else:
            print "Responda de 0 a 26"
    return estado

def questoes():
    print separador
    print "QUESTOES DE GOVERNO\n"
    email   = raw_input("Seu e-mail: ").lower()
    busca = c.execute("SELECT id_usuario FROM usuarios WHERE email='%s'" % (email))
    lista  = c.fetchall()
    if lista:
        idUser = lista[0][0]
        usuario = str(idUser)
        opinioes = []
        sql = "SELECT * FROM questoes"
        c.execute(sql)
        perguntas = c.fetchall()
        print ""
        while True:
            for row in perguntas:
                print "PERGUNTA",row[0],"-",
                print row[3]
                print "1 - Sim"
                print "2 - Nao"
                while True:
                    opcao = raw_input("Opcao: ")
                    resposta = ""
                    if opcao=="1":
                        resposta = "Sim"
                        break
                    elif opcao=="2":
                        resposta = "Nao"
                        break
                    else:
                        print "Responda 1 ou 2"
                listaTemp = []
                listaTemp.append(str(int(row[0])))
                listaTemp.append(resposta)
                opinioes.append(listaTemp)
                print ""
            break;
        
        for opiniao in opinioes:
            hoje = date.today()
            hoje = str(hoje.year)+"/"+str(hoje.month)+"/"+str(hoje.day)

            #Verificação de resposta anterior
            busca2 = c.execute("SELECT * FROM opinioes WHERE id_quest='%s' and id_usuar='%s'" % (opiniao[0], usuario))
            lista2 = c.fetchall()
            if lista2:
                c.execute("UPDATE opinioes SET opiniao='%s', data='%s' WHERE id_quest='%s' and id_usuar='%s'" %(opiniao[1], hoje, opiniao[0], usuario))
            else:
                c.execute("INSERT INTO opinioes VALUES('%s','%s','%s','%s')" % (opiniao[0], usuario, opiniao[1], hoje))
            con.commit()
        print "Opinioes cadastradas com sucesso"
        print ""
    else:
        print "Email nao cadastrado!!"

def comparadorLocal():
    email   = raw_input("Seu e-mail: ").lower()
    busca = c.execute("SELECT id_usuario FROM usuarios WHERE email='%s'" % (email))
    lista  = c.fetchall()
    if lista:
        idUser = lista[0][0]
        usuario = str(idUser)
        #1- Armazenar em lista todas as opiniões do usuário.
        listaOpinioes = []
        sql = "SELECT * FROM opinioes WHERE id_usuar='%s'" % (usuario)
        c.execute(sql)
        opinioes = c.fetchall()
        if len(opinioes)==0:
            print "Nao foram encontradas opinioes no banco de dados para esse usuario"
        else:
            for opiniao in opinioes:
                temp = []
                temp.append(str(int(opiniao[0])))
                temp.append(str(opiniao[2]))
                listaOpinioes.append(temp)

            #2- Coletar o estado do usuário
            busca  = c.execute("SELECT estado_user FROM usuarios WHERE id_usuario='%s'" % (usuario))
            lista  = c.fetchall()
            estado = lista[0][0].upper()

            #3- Coleta de deputados.
            lista_geral_de_scores = []
            lista_de_deputados = []
            busca  = c.execute("SELECT * FROM deputados WHERE estado='%s'" % (estado))
            lista  = c.fetchall()
            for deputado in lista:
                deput = int(deputado[0])
                nome = deputado[1]
                partido = deputado[2]
                lista_de_deputados.append(deput)
                sql = "SELECT * FROM votos WHERE id_deput='%s'" % (deput)
                c.execute(sql)
                votos = c.fetchall()
                listaVotos = []
                historico = []
                for row in votos:
                    questao = str(int(row[0]))
                    voto    = str(row[2])
                    temp = []
                    temp.append(questao)
                    temp.append(voto)
                    listaVotos.append(temp)
                score, historico = calculaScore(listaOpinioes, listaVotos)
                temp = []
                temp.append(nome)
                temp.append(partido)
                temp.append(score)
                temp.append(len(listaVotos))
                temp.append(historico)
                lista_geral_de_scores.append(temp)
            
            nomes = []
            partidos = []
            scores = []
            votos = []
            historicos = []
            titulos = ["Deputados","Scores"]
            lista_geral_de_scores = sorted(lista_geral_de_scores, key=lambda e:[-e[2], -e[3]])
            for deputado in lista_geral_de_scores:
                nomes.append(deputado[0])
                partidos.append(deputado[1])
                scores.append(deputado[2])
                votos.append(deputado[3])
                historicos.append(deputado[4])
            
            a = pandas.DataFrame({'DEPUTADO':nomes,'PARTIDO':partidos, 'SCORE':scores,'VOTOS':votos})
            print ""
            print "Estado:",estado.upper()
            print separador
            print a
            print ""

            opinioes = []
            for opiniao in listaOpinioes:
                opinioes.append(opiniao[1])
                
            while True:
                try:
                    deputado = int(detalhamento())
                    if (deputado>=0 and deputado<len(nomes)):
                        nome = nomes[deputado]
                        score = scores[deputado]
                        respostas = []
                        perguntas = ["Afastar Dilma Roussef?","Terceirizacao para tudo?","Especializacoes publicas pagas?","Apoia a reforma trabalhista?","Arquivar investigacao contra Michel temer?"]
                        for pergunta in perguntas:
                            posicao = perguntas.index(pergunta)
                            respostas.append(historicos[deputado][posicao][1])
                        print ""
                        print separador
                        print "Deputado:",nome.upper(),"\t\t\tSimilaridade:",score
                        print separador
                        b = pandas.DataFrame({'PERGUNTA':perguntas,'RESPOSTA':respostas, 'VOCê':opinioes})
                        print b
                        print ""
                    else:
                        break;
                except Exception:
                    pass
    else:
        print "Email nao cadastrado!!"

def detalhamento():
    opcao = raw_input("Escolha um deputado para detalhar votos ou (-1) para sair: ")
    return opcao

def calculaScore(listaOpinioes, listaVotos):
    tamanhoUsuario = len(listaOpinioes)
    tamanhoDeputado= len(listaVotos)
    score = 0.0
    matchs= 0.0
    votos = 0
    opinioes = []
    votos = []
    historico = []
    for voto in listaVotos:
        votos.append(voto[0])
    for opiniao in listaOpinioes:
        if opiniao[0] in votos:
            posicao = votos.index(opiniao[0])
            historico.append(listaVotos[posicao])
            if opiniao[1] == listaVotos[posicao][1]:
                matchs += 1
        else:
            temp = []
            temp.append(opiniao[0])
            temp.append('Faltou')
            historico.append(temp)
    score = int(matchs / tamanhoUsuario*100.0)
    return score, historico    
    
main = 1
while main:
    main = menu()
c.close()
