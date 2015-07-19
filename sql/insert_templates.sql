INSERT INTO `webshop`.`clients` (`id`, `name`, `email`, `cpf`, `telephone`, `password`) VALUES (NULL, NULL, NULL, NULL, NULL, NULL);

INSERT INTO `webshop`.`addresses` (`id`, `des`, `street`, `num`, `city`, `zip`, `clients_id`) VALUES (NULL, NULL, NULL, NULL, NULL, NULL, NULL);

INSERT INTO `webshop`.`orders` (`id`, `data_order`, `data_mod`, `status`, `price_products`, `price_shipping`, `discounts`, `clientes_id`) VALUES (NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

INSERT INTO `webshop`.`products` (`id`, `name`, `des`, `price`) VALUES (NULL, NULL, NULL, NULL);

INSERT INTO `webshop`.`orders_has_products` (`orders_id`, `products_id`) VALUES (NULL, NULL);