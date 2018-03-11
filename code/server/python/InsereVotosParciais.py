# -*- coding: utf-8 -*-
import MySQLdb
import csv
from difflib import SequenceMatcher
import time

con = MySQLdb.connect(host='localhost', user='root', passwd='', db='eu_parlamentar')
c = con.cursor()

def calculo(a,b):
    return SequenceMatcher(None,a,b).ratio()

def menu():
    questao = raw_input("Pergunta 9 ou 10: ")
    if questao=="9":
        arquivo = './questoes/Votos2.csv'
        montaQuerys(questao, arquivo)
        return 1
    elif questao=="10":
        arquivo = './questoes/votoobrigatorio.csv'
        montaQuerys(questao, arquivo)
        return 1
    else:
        return 0

def montaQuerys(questao, arquivo):
    print "INSERT INTO `eu_parlamentar`.`votos` (`id_quest`, `id_deput`, `voto`) VALUES" 
    ifile  = open(arquivo, "rb")
    reader = csv.reader(ifile)
    rownum = 0
    contadorExato = 0
    contadorInexistente = 0
    contadorAproximado = 0
    aproximados = []
    inexistente = []
    for row in reader:
        if rownum == 0:
            header = row
            rownum += 1
        else:
            estado   = row[0]
            nome     = row[1]
            partido  = row[2]
            voto     = row[3]
            if (voto[0]=="N"): voto="Nao"
            if (voto[0:3]=="Abs"): voto="Abstencao"
            verifica = c.execute("SELECT id_deputado FROM deputados WHERE nome='%s'" % (nome))
            if (verifica == 1):
                lista       = c.fetchall()
                idDeputado  = long(lista[0][0])
                contadorExato += 1
                print "('%s', '%s', '%s'),"%(questao, idDeputado, voto)
            else:
                sql = "SELECT id_deputado, nome FROM deputados"
                c.execute(sql)
                results = c.fetchall()
                similar = []
                nomeTemp = nome.replace(' ','').upper()
                for linha in results:
                    nomeDoBanco = linha[1].replace(' ','').upper()
                    similaridade = calculo(nomeDoBanco,nomeTemp)
                    similaridade = int(float("%.3f" %(similaridade))*100)
                    if (len(similar)!=0):
                        if (similar[2] < similaridade):
                            similar[0] = linha[0]
                            similar[1] = linha[1]
                            similar[2] = similaridade
                    else:
                        if similaridade > 60:
                            similar.append(linha[0])
                            similar.append(linha[1])
                            similar.append(similaridade)
                if (len(similar)!=0):
                    contadorAproximado += 1
                    temp = []
                    temp.append(questao)
                    temp.append(similar[0])
                    temp.append(voto)
                    aproximados.append(temp)
                else:
                    inexistente.append(nome)
                    contadorInexistente += 1
        
    ifile.close()
    print ""
    print "Exatos    :",contadorExato
    print "Aproximado:",contadorAproximado
    print "Inexistent:",contadorInexistente
    print "Total:",(contadorExato+contadorAproximado+contadorInexistente)
    print ""
    for tupla in aproximados:
        if tupla[1]=="490":
            tupla[1]= "98";
        print "('%s', '%s', '%s'),"%(tupla[0], tupla[1], tupla[2])
    print ""
    print "Inexistentes"
    print inexistente


main = 1
while main:
    main = menu()
c.close()
