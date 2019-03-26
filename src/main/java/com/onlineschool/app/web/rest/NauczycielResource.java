package com.onlineschool.app.web.rest;
import com.onlineschool.app.domain.Nauczyciel;
import com.onlineschool.app.repository.NauczycielRepository;
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
 * REST controller for managing Nauczyciel.
 */
@RestController
@RequestMapping("/api")
public class NauczycielResource {

    private final Logger log = LoggerFactory.getLogger(NauczycielResource.class);

    private static final String ENTITY_NAME = "nauczyciel";

    private final NauczycielRepository nauczycielRepository;

    public NauczycielResource(NauczycielRepository nauczycielRepository) {
        this.nauczycielRepository = nauczycielRepository;
    }

    /**
     * POST  /nauczyciels : Create a new nauczyciel.
     *
     * @param nauczyciel the nauczyciel to create
     * @return the ResponseEntity with status 201 (Created) and with body the new nauczyciel, or with status 400 (Bad Request) if the nauczyciel has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/nauczyciels")
    public ResponseEntity<Nauczyciel> createNauczyciel(@Valid @RequestBody Nauczyciel nauczyciel) throws URISyntaxException {
        log.debug("REST request to save Nauczyciel : {}", nauczyciel);
        if (nauczyciel.getId() != null) {
            throw new BadRequestAlertException("A new nauczyciel cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Nauczyciel result = nauczycielRepository.save(nauczyciel);
        return ResponseEntity.created(new URI("/api/nauczyciels/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /nauczyciels : Updates an existing nauczyciel.
     *
     * @param nauczyciel the nauczyciel to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated nauczyciel,
     * or with status 400 (Bad Request) if the nauczyciel is not valid,
     * or with status 500 (Internal Server Error) if the nauczyciel couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/nauczyciels")
    public ResponseEntity<Nauczyciel> updateNauczyciel(@Valid @RequestBody Nauczyciel nauczyciel) throws URISyntaxException {
        log.debug("REST request to update Nauczyciel : {}", nauczyciel);
        if (nauczyciel.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Nauczyciel result = nauczycielRepository.save(nauczyciel);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, nauczyciel.getId().toString()))
            .body(result);
    }

    /**
     * GET  /nauczyciels : get all the nauczyciels.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of nauczyciels in body
     */
    @GetMapping("/nauczyciels")
    public List<Nauczyciel> getAllNauczyciels() {
        log.debug("REST request to get all Nauczyciels");
        return nauczycielRepository.findAll();
    }

    /**
     * GET  /nauczyciels/:id : get the "id" nauczyciel.
     *
     * @param id the id of the nauczyciel to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the nauczyciel, or with status 404 (Not Found)
     */
    @GetMapping("/nauczyciels/{id}")
    public ResponseEntity<Nauczyciel> getNauczyciel(@PathVariable Long id) {
        log.debug("REST request to get Nauczyciel : {}", id);
        Optional<Nauczyciel> nauczyciel = nauczycielRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(nauczyciel);
    }

    /**
     * DELETE  /nauczyciels/:id : delete the "id" nauczyciel.
     *
     * @param id the id of the nauczyciel to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/nauczyciels/{id}")
    public ResponseEntity<Void> deleteNauczyciel(@PathVariable Long id) {
        log.debug("REST request to delete Nauczyciel : {}", id);
        nauczycielRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
