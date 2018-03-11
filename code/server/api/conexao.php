<?php

	header("Access-Control-Allow-Origin:http://localhost:8100");
    header("Content-Type: application/x-www-form-urlencoded");
	header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
	
    class Model {

        protected $db;

        public function __construct(){
            $this->db = new PDO('mysql:host=localhost;dbname=eu_parlamentar', 'root', '');
        }

        public function insereUsuario( $tabela, Array $dados){
            $query = "email = '".$dados[4]."' ORDER BY id_usuario desc";
            $n = new Model();
            $a = $n->read( "usuarios", $query);
            if ($a){
                return $a[0][0];
            }
            else{
                $dado = "VALUES (".$dados[0].", '".$dados[1]."', '".$dados[2]."', '".$dados[3]."', '".$dados[4]."', '".$dados[5]."')";
                if($qs = $this->db->query(" INSERT INTO `{$tabela}` {$dado} ")){
                    $query = "email = '".$dados[4]."' ORDER BY id_usuario desc";
                    $n = new Model();
                    $a = $n->read( "usuarios", $query);
                    if ($a){
                        return $a[0][0];
                    }
                }
                $qs = null;
                return 0;
            }
        }

        public function read($tabela, $where = null){
            $where = ($where != null ? " WHERE {$where}" : "");
            if($qs = $this->db->query(" SELECT * FROM `{$tabela}` {$where} ") )
            {   
                if ($qs->rowCount() > 0)
                {
                    $rows = $qs->fetchAll();
                    foreach ($rows as $row) {
                        return $rows;
                    }
                }
            }
            $qs = null;
            return 0;
        }
        
        public function buscaQuestoes($consulta = null){
            if($qs = $this->db->query("$consulta") )
            {   
                if ($qs->rowCount() > 0)
                {
                    $rows = $qs->fetchAll();
                    foreach ($rows as $row) {
                        return $rows;
                    }
                }
            }
            $qs = null;
            return 0;
        }

        public function buscaUFs($tabela, $where = null){
            $where = ($where != null ? " WHERE {$where}" : "");
            if($qs = $this->db->query(" SELECT distinct(estado) FROM `{$tabela}` {$where} ") )
            {   
                if ($qs->rowCount() > 0)
                {
                    $rows = $qs->fetchAll();
                    foreach ($rows as $row) {
                        return $rows;
                    }
                }
            }
            $qs = null;
            return 0;
        }

        public function insereResposta( $tabela, Array $dados){
            $dado = "VALUES (".$dados[0].", '".$dados[1]."', '".$dados[2]."', '".$dados[3]."', '".$dados[4]."')";
            if($qs = $this->db->query(" INSERT INTO `{$tabela}` {$dado} ") )
            {
                return 1;
            }
            $qs = null;
            return 0;
        }

        public function contato( $tabela, Array $dados){
            $dado = "VALUES (".$dados[0].", '".$dados[1]."', '".$dados[2]."', '".$dados[3]."', '".$dados[4]."', '".$dados[5]."', '".$dados[6]."', '".$dados[7]."')";
            if($qs = $this->db->query(" INSERT INTO `{$tabela}` {$dado} ") )
            {
                $query = "email = '".$dados[2]."' AND data = '".$dados[5]."' ORDER BY data desc LIMIT 1";
                $n = new Model();
                $a = $n->read( "contatos", $query);
                if ($a)
                {
                    return $a[0][0];
                }
            }
            $qs = null;
            return 0;
        }
    }

    //TESTE DA CLASSE

    $m = new Model();

    //READ
    // $a = $m->read( 'usuarios');
    // echo"<br><br>";
    // print_r ($a[0]);

    //INSERT (sem verificação de duplicidades)
    //$a = $m->insert( 'usuarios', ['NULL', 'alesanco','PE'] );
    //print_r ("Id: ".$a);
?>