INSERT INTO `webshop`.`clientes` (`id`, `nome`, `cpf`, `telefone`, `senha`) 
VALUES (NULL, NULL, NULL, NULL, NULL);

INSERT INTO `webshop`.`enderecos` (`id`, `desc`, `rua`, `numero`, `bairro`, `cidade`, `cep`, `clientes_id`) 
VALUES (NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

INSERT INTO `webshop`.`pedidos` (`id`, `data_compra`, `data_mod`, `status`, `valor_produtos`, `valor_frete`, `descontos`, `clientes_id`) 
VALUES (NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

INSERT INTO `webshop`.`produtos` (`id`, `nome`, `desc`, `valor`) 
VALUES (NULL, NULL, NULL, NULL);

INSERT INTO `webshop`.`pedidos_has_produtos` (`pedidos_id`, `produtos_id`) 
VALUES (NULL, NULL);