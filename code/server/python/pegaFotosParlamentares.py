# -*- coding: cp1252 -*-
# Programa para coleta das fotos de todos os deputados federais do Brasil em Janeiro de 2018.
# Pré-requisitos:
# - Python 2.7
# - Requests -> pip install requests
# - Six -> pip install six
# Autor: Alesanco Andrade Azevedo - alesancoml@gmail.com


import requests
import os
from six.moves import urllib

def criaListaLinks(content):
    links = []
    for line in content.split('visualNoMarker'):
        index = line.find('Dep_Detalhe')
        if index != -1:
            deputado = int(line[index+19:index+26])
            links.append(deputado)
    return links

def pegaFoto(content, estado):
    index = content.find('bandep')
    if index != -1:
        fim = content.find('jpg',index)
        link = content[index-43:fim+3]
        inicio = link.find('bandep')
        arq = link[inicio+7::]
        arquivo = './fotos/'+estado+'/'+arq
        urllib.request.urlretrieve(link, arquivo)
        index2 = content.find('<title>')
        if index2 != -1:
            fim = content.find('â€',index2)
            if fim != -1:
                nome = content[index2+16:fim]
                local = "./fotos/"+estado+".txt"
                registro = open(local,'a')
                registro.write(arq+" "+nome+"\n")
                registro.close()
                print nome

estados = ["AC","AL","AM","AP","BA","CE","DF","ES","GO","MA","MG","MS","MT","PA","PB","PE","PI","PR","RJ","RN","RO","RR","RS","SC","SE","SP","TO"]

if not os.path.exists('./fotos/'):
    os.mkdir ('./fotos')
    
for estado in estados:
    deputados = []
    if not os.path.exists('./fotos/'+estado):
        os.mkdir ('./fotos/'+estado)
    r = requests.get("http://www.camara.leg.br/internet/deputado/Dep_Lista.asp?Legislatura=55&Partido=QQ&SX=QQ&Todos=None&UF=%s&condic=QQ&forma=lista&nome=&ordem=nome&origem=None"%(estado))
    deputados = criaListaLinks(r.content)
    print "\n####################################"
    print "ESTADO:",estado
    print "DEPUTADOS:",len(deputados),"\n"
    for deputado in deputados:
        r = requests.get("http://www.camara.leg.br/internet/deputado/Dep_Detalhe.asp?id=%d"%(deputado))
        pegaFoto(r.content, estado)
