<?php 
function calculaScore($listaOpinioes,$listaVotos){

    $tamanhoUsuario = count($listaOpinioes);
    $opinioes 		= [];
    $listaGeralScores = [];
            
    foreach( $listaVotos as $key1 => $value1){	//VARREDURA EM CADA DEPUTADO
        $score 			= 0.0;
        $matchs			= 0;
        $votos 			= [];
        $historico 		= [];
        $deputado 		= $value1[0];
        $vot1 = [];	//número das perguntas votadas
        $vot2 = []; //resposta das perguntas votadas

        foreach( $value1[1] as $key2 => $value2){ //COLETA DO NÚMERO DAS PERGUNTAS VOTADAS PELO DEPUTADO
            array_push($vot1, $value2[0]);
            array_push($vot2, $value2[1]);
        }
        
        foreach($listaOpinioes as $key2 => $value2){ //LAÇO SOB AS OPINIÕES DO USUÁRIO
            if (in_array($value2[0], $vot1)) { 		//VERIFICA SE A QUESTÃO FOI VOTADA PELO DEPUTADO
                $posicao = array_search($value2[0], $vot1);
                $temp = [];
                array_push($temp,$vot1[$posicao]);
                array_push($temp,$vot2[$posicao]);
                array_push($historico,$temp);
                
                if($value2[1]==$vot2[$posicao]){
                    $matchs	= $matchs + 1;
                }
            }
            else{
                $temp = [];
                array_push($temp,$value2[0]);
                array_push($temp,"Faltou");
                array_push($historico,$temp);
            }
        }

        $score = ceil(($matchs/$tamanhoUsuario)*100);	//CÁLCULO DO SCORE
        
        $temp = [];
        array_push($temp,$deputado);
        array_push($temp,$score);
        array_push($temp,$historico);
        array_push($listaGeralScores,$temp);
    }
    //ORDENAÇÃO DECRESCENTE DE DEPUTADOS DE ACORDO COM SEU SCORE
    $sortArray = array(); 
    foreach($listaGeralScores as $person){ 
        foreach($person as $key=>$value){ 
            if(!isset($sortArray[$key])){ 
                $sortArray[$key] = array(); 
            } 
            $sortArray[$key][] = $value; 
        } 
    } 
    array_multisort($sortArray[1],SORT_DESC,$listaGeralScores); 
    
    return $listaGeralScores;
    
}
?>