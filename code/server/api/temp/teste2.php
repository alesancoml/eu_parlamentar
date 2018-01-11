<?php
    class Model {

        protected $db;

        public function __construct(){
            $this->db = new PDO('mysql:host=localhost;dbname=eu_parlamentar', 'root', '');
        }

        public function insert( $tabela, Array $dados){
            $dado = "VALUES (".$dados[0].", '".$dados[1]."', '".$dados[2]."')";
            if($qs = $this->db->query(" INSERT INTO `{$tabela}` {$dado} ") )
            {
                $query = "email = '".$dados[1]."' AND estado_user = '".$dados[2]."' ORDER BY id_usuario desc";
                $n = new Model();
                $a = $n->read( "usuarios", $query);
                if ($a)
                {
                    return $a[0][0];
                }
            }
            $qs = null;
            return 'Instabilidade no banco ou tabela ausente!';
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
            return 'Instabilidade no banco ou tabela ausente!';
        }
    }

    //TESTE DA CLASSE

    //$m = new Model();

    //READ
    // $a = $m->read( 'usuarios', 'id_usuario = 14' );
    // print_r ($a[0][0]);

    //INSERT (sem verificação de duplicidades)
    //$a = $m->insert( 'usuarios', ['NULL', 'alesanco','PE'] );
    //print_r ("Id: ".$a);
?>