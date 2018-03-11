#!/usr/bin/python
# -*- coding: utf-8 -*-

import MySQLdb
import os, sys
from difflib import SequenceMatcher

con = MySQLdb.connect(host='localhost', user='root', passwd='', db='eu_parlamentar')
c = con.cursor()
d = con.cursor()
e = con.cursor()
g = con.cursor()
h = con.cursor()

endereco1 = './fotos/'
ufsEstados = []
ufs = ["AC","AL","AM","AP","BA","CE","DF","ES","GO","MA","MG","MS","MT","PA","PB","PE","PI","PR","RJ","RN","RO","RR","RS","SC","SE","SP","TO"]
estados = ["ACRE",
           "ALAGOAS",
           "AMAZONAS",
           "AMAPÁ",
           "BAHIA",
           "CEARÁ",
           "DISTRITO FEDERAL",
           "ESPÍRITO SANTO",
           "GOIÁS",
           "MARANHÃO",
           "MINAS GERAIS",
           "MATO GROSSO DO SUL",
           "MATO GROSSO",
           "PARÁ",
           "PARAÍBA",
           "PERNAMBUCO",
           "PIAUÍ",
           "PARANÁ",
           "RIO DE JANEIRO",
           "RIO GRANDE DO NORTE",
           "RONDONIA",
           "RORAIMA",
           "RIO GRANDE DO SUL",
           "SANTA CATARINA",
           "SERGIPE",
           "SÃO PAULO",
           "TOCANTINS"]

def calculo(a,b):
    return SequenceMatcher(None,a,b).ratio()

sql = "SELECT distinct(estado) as estados FROM deputados order by estados"
c.execute(sql)
results = c.fetchall()
for row in results:
    if row[0] in estados:
        indice = estados.index(row[0])
        temp = []
        temp.append(ufs[indice])
        temp.append(row[0])
        ufsEstados.append(temp)

a = True
geral = []
for estado in os.listdir(endereco1):
    if len(estado)==6:
        registros = []
        arq = "./fotos/"+estado
        with open(arq, 'r') as f:
            c = f.read()
            valores = c.split('\n')
            for e in valores:
                posicao = e.find(' ')
                foto = e[0:posicao].strip()
                pessoa = e[posicao+1::].strip()
                if a==True:
                    foto = foto[3::]
                    a = False
                if len(foto)>10:
                    foto = foto[3::]
                if foto != "":
                    temp = []
                    indice = ufs.index(estado[0:2])
                    temp.append(estados[indice])
                    temp.append(foto)
                    temp.append(pessoa)
                    geral.append(temp)
                    sql = "SELECT * FROM deputados where nome='%s' order by estado"%(pessoa)
                    d.execute(sql)
                    results = d.fetchall()
                    if results:
                        for row in results:
                            local = estado[0:2]+"/"+foto
                            dep = str(row[0])
                            g.execute("UPDATE deputados SET foto=%s WHERE id_deputado=%s",(local,dep))
                            con.commit()
                    else:
                        similar = []
                        sql = "SELECT * FROM deputados where foto is NULL order by estado"
                        d.execute(sql)
                        results = d.fetchall()
                        if results:
                            for row in results:
                                pessoa = pessoa.replace(' ','').upper()
                                nomeDoBanco = row[1].replace(' ','').upper()
                                similaridade = calculo(nomeDoBanco,pessoa)
                                similaridade = "%.3f" %(similaridade)
                                if (len(similar)!=0):
                                    if (similar[2]<similaridade and float(similaridade)>0.50):
                                        similar[0] = row[0]
                                        similar[1] = row[1]
                                        similar[2] = similaridade
                                else:
                                    if float(similaridade)>0.50:
                                        similar.append(row[0])
                                        similar.append(row[1])
                                        similar.append(similaridade)
                            if len(similar)==0:
                                pass
                                #print pessoa, "##################################################################NAO ACHOU"
                            else:
                                
                                local = estado[0:2]+"/"+foto
                                dep = str(similar[0])
                                h.execute("UPDATE deputados SET foto=%s WHERE id_deputado=%s",(local,dep))
                                con.commit()
                                print local,dep


##c.close()
##d.close()
##e.close()
##g.close()
##h.close()
con.close()                               

        
