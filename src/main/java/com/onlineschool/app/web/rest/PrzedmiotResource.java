package com.onlineschool.app.web.rest;
import com.onlineschool.app.domain.Przedmiot;
import com.onlineschool.app.repository.PrzedmiotRepository;
import com.onlineschool.app.web.rest.errors.BadRequestAlertException;
import com.onlineschool.app.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Przedmiot.
 */
@RestController
@RequestMapping("/api")
public class PrzedmiotResource {

    private final Logger log = LoggerFactory.getLogger(PrzedmiotResource.class);

    private static final String ENTITY_NAME = "przedmiot";

    private final PrzedmiotRepository przedmiotRepository;

    public PrzedmiotResource(PrzedmiotRepository przedmiotRepository) {
        this.przedmiotRepository = przedmiotRepository;
    }

    /**
     * POST  /przedmiots : Create a new przedmiot.
     *
     * @param przedmiot the przedmiot to create
     * @return the ResponseEntity with status 201 (Created) and with body the new przedmiot, or with status 400 (Bad Request) if the przedmiot has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/przedmiots")
    public ResponseEntity<Przedmiot> createPrzedmiot(@Valid @RequestBody Przedmiot przedmiot) throws URISyntaxException {
        log.debug("REST request to save Przedmiot : {}", przedmiot);
        if (przedmiot.getId() != null) {
            throw new BadRequestAlertException("A new przedmiot cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Przedmiot result = przedmiotRepository.save(przedmiot);
        return ResponseEntity.created(new URI("/api/przedmiots/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /przedmiots : Updates an existing przedmiot.
     *
     * @param przedmiot the przedmiot to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated przedmiot,
     * or with status 400 (Bad Request) if the przedmiot is not valid,
     * or with status 500 (Internal Server Error) if the przedmiot couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/przedmiots")
    public ResponseEntity<Przedmiot> updatePrzedmiot(@Valid @RequestBody Przedmiot przedmiot) throws URISyntaxException {
        log.debug("REST request to update Przedmiot : {}", przedmiot);
        if (przedmiot.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Przedmiot result = przedmiotRepository.save(przedmiot);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, przedmiot.getId().toString()))
            .body(result);
    }

    /**
     * GET  /przedmiots : get all the przedmiots.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of przedmiots in body
     */
    @GetMapping("/przedmiots")
    public List<Przedmiot> getAllPrzedmiots() {
        log.debug("REST request to get all Przedmiots");
        return przedmiotRepository.findAll();
    }

    /**
     * GET  /przedmiots/:id : get the "id" przedmiot.
     *
     * @param id the id of the przedmiot to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the przedmiot, or with status 404 (Not Found)
     */
    @GetMapping("/przedmiots/{id}")
    public ResponseEntity<Przedmiot> getPrzedmiot(@PathVariable Long id) {
        log.debug("REST request to get Przedmiot : {}", id);
        Optional<Przedmiot> przedmiot = przedmiotRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(przedmiot);
    }

    /**
     * DELETE  /przedmiots/:id : delete the "id" przedmiot.
     *
     * @param id the id of the przedmiot to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/przedmiots/{id}")
    public ResponseEntity<Void> deletePrzedmiot(@PathVariable Long id) {
        log.debug("REST request to delete Przedmiot : {}", id);
        przedmiotRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
