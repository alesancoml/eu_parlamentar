SELECT voto, count(*) FROM eu_parlamentar.votos where id_quest="8" group by voto;
SELECT estado, voto, count(*) FROM eu_parlamentar.votos inner join deputados on id_deput=id_deputado where id_quest="2" group by estado, voto;
SELECT nome, voto FROM eu_parlamentar.votos inner join deputados on id_deput=id_deputado where estado="CEARÃ" and id_quest="2" order by nome;