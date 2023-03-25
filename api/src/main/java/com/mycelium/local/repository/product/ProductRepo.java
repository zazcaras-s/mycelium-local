package com.mycelium.local.repository.product;

import java.util.List;

import io.micronaut.data.annotation.Query;
import io.micronaut.data.annotation.Repository;
import io.micronaut.data.jdbc.annotation.JdbcRepository;
import io.micronaut.data.model.query.builder.sql.Dialect;
import io.micronaut.data.repository.CrudRepository;

@Repository("default")
@JdbcRepository(dialect = Dialect.ORACLE)
public interface ProductRepo extends CrudRepository<Product, Integer> {
    List<Product> findByCategorieId(Integer categorieId);

    @Query("SELECT * FROM (SELECT p.id, sum(o.QUANTITY) AS suma FROM ORDERPRODUCT o JOIN PRODUCT p ON o.PRODUCTID = p.ID GROUP BY p.ID ORDER BY suma DESC) a JOIN PRODUCT p2 ON a.id = p2.ID")
    List<Product> findTop3Sales();

    @Query("SELECT p.ID , p.name, p.\"DESC\" , p.BRAND , p.WEIGHT , p.QUANTITY , p.PRICE , p.CATEGORIEID FROM (SELECT o.PRODUCTID, max(o.CREATED) AS created FROM ORDERPRODUCT o GROUP BY o.PRODUCTID ORDER BY max(o.CREATED) DESC) a JOIN PRODUCT p ON p.id = a.productid")
    List<Product> findLastBought();
}