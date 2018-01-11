<?php
	include './Conexao.php';  

	try {
		
	
	$Obj_Conexao = new Conexao();
	$conexao = $Obj_Conexao->getAbrirConexao();
	$query = "select * from usuario";
    $result = $conexao->query($query);
    echo($result);


	while ( $dados = $result->fetch_assoc() ) {
        echo 'ID: ' . $dados['ID_USUARIO'] . '<br />';
}
	
	$Obj_Conexao->setFecharConexao($conexao);
	
	
	
	
	} catch (Exception $e) {
	    echo 'Caught exception: ',  $e->getMessage(), "\n";
	}

?>