package com.mycelium.local.technical;

import java.util.List;

import com.mycelium.local.repository.technical.Technical;
import com.mycelium.local.repository.technical.TechnicalRepo;

import io.micronaut.http.annotation.Body;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Delete;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.Post;
import io.micronaut.http.annotation.Put;
import io.micronaut.security.annotation.Secured;
import io.micronaut.security.rules.SecurityRule;
import io.micronaut.security.annotation.Secured;

class TechnicalCreateRequest {
    public String type;
    public String value;
    public int productId;
}

@Secured(SecurityRule.IS_ANONYMOUS)
@Controller("/product/{id}/technical")
public class TechnicalController {

    private TechnicalRepo technicalRepo;

    public TechnicalController(TechnicalRepo technicalRepo) {
        this.technicalRepo = technicalRepo;
    }

    @Get("/")
    public List<Technical> list() {
        return technicalRepo.findAll();
    }

    @Secured(SecurityRule.IS_AUTHENTICATED)
    @Post("/")
    public void create(@Body TechnicalCreateRequest body) {
        technicalRepo.create(body.type, body.value, body.productId);
    }

    @Secured(SecurityRule.IS_AUTHENTICATED)
    @Put("/")
    public void update() {
        // TODO
    }

    @Secured(SecurityRule.IS_AUTHENTICATED)
    @Delete("/")
    public void delete() {
        // TODO
    }
}