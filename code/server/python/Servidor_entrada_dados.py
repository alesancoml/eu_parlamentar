# -*- coding: utf-8 -*-
import MySQLdb
import csv

con = MySQLdb.connect(host='localhost', user='root', passwd='', db='eu_parlamentar')
c = con.cursor()

def menu():
    print "*********************************"
    print "MENU\n"
    print "1 - Cadastrar Questao"
    print "2 - Listar Questoes"
    print "3 - Capturar Votos"
    print "4 - SAIR\n"
    opcao = raw_input("Escolha uma opcao: ")
    if opcao=="1":
        cadastrarQuestao()
        return 1
    elif opcao=="2":
        listarQuestoes()
        return 1
    elif opcao=="3":
        menu2()
        return 1
    else:
        return 0

def menu2():
    print ""
    print "*******************"
    print "INSERIR VOTOS PARA QUAL QUESTAO?"
    listarQuestoes()
    questao  = raw_input("Digite o número da questao: ")
    arquivo  = raw_input("Digite o nome do arquivo de dados com sua extensao: ")
    arquivo = '../Questoes/'+arquivo
    capturarVotos(questao, arquivo)

def cadastrarQuestao():
    print ""
    print "*******************"
    print "CADASTRAR QUESTAO"
    data    = raw_input("Data em que foi votada a questao: ")
    codigo  = raw_input("Codigo da questao: ")
    questao = raw_input("Texto da questao: ")
    link    = raw_input("Link para consulta da questao: ")
    dia = data[0:2]
    mes = data[3:5]
    ano = data[6::]
    data = ano+"/"+mes+"/"+dia    
    try:
        c.execute("INSERT INTO questoes VALUES(NULL,'%s','%s','%s','%s')" % (data, codigo, questao, link))
        idQuestao = c.lastrowid
        con.commit()
        print "OK - Questao inserida com sucesso"
        print ""
    except Exception:
        print "FALHA - Ocorreu algum problema na inserção da questao"
        print ""
    
def listarQuestoes():
    sql = "SELECT * FROM questoes"
    c.execute(sql)
    results = c.fetchall()
    print ""
    for row in results:
        print "PERGUNTA",row[0],"-",
        print row[3]
    print ""

def capturarVotos(questao, arquivo):
    ifile  = open(arquivo, "rb")
    reader = csv.reader(ifile)
    rownum = 0
    for row in reader:
        if rownum == 0:
            header = row
        else:
            estado   = row[0]
            nome     = row[1]
            partido  = row[2]
            voto     = row[3]
            if voto == "Não": voto = "Nao"
            if voto == "Abstenção": voto = "Abstencao"
            deputado = coletaDeputado(estado, nome, partido)
            insereVotos(questao, deputado, voto)
        rownum += 1
    ifile.close()

def coletaDeputado(estado, nome, partido):
    verifica = c.execute("SELECT id_deputado FROM deputados WHERE nome='%s' and partido='%s' and estado='%s'" % (nome, partido, estado))
    if (verifica == 0):
        c.execute("INSERT INTO deputados VALUES(NULL,%s,%s, %s)" , (nome, partido, estado))
        idDeputado = c.lastrowid
        con.commit()
        return idDeputado
    else:
        lista       = c.fetchall()
        idDeputado  = long(lista[0][0])
        return idDeputado

def insereVotos(questao, deputado, voto):
    verifica = c.execute("SELECT * FROM votos WHERE id_quest='%s' and id_deput='%s'" % (questao, deputado))
    if (verifica == 0):
        c.execute("INSERT INTO votos VALUES(%s,%s, %s)" , (questao, deputado, voto))
        con.commit()
        print questao, deputado, voto
    else:
        print "ATENCAO - Voto js computado anteriormente."

main = 1
while main:
    main = menu()
c.close()


 
