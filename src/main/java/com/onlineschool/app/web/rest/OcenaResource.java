package com.onlineschool.app.web.rest;
import com.onlineschool.app.domain.Ocena;
import com.onlineschool.app.repository.OcenaRepository;
import com.onlineschool.app.web.rest.errors.BadRequestAlertException;
import com.onlineschool.app.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Ocena.
 */
@RestController
@RequestMapping("/api")
public class OcenaResource {

    private final Logger log = LoggerFactory.getLogger(OcenaResource.class);

    private static final String ENTITY_NAME = "ocena";

    private final OcenaRepository ocenaRepository;

    public OcenaResource(OcenaRepository ocenaRepository) {
        this.ocenaRepository = ocenaRepository;
    }

    /**
     * POST  /ocenas : Create a new ocena.
     *
     * @param ocena the ocena to create
     * @return the ResponseEntity with status 201 (Created) and with body the new ocena, or with status 400 (Bad Request) if the ocena has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/ocenas")
    public ResponseEntity<Ocena> createOcena(@RequestBody Ocena ocena) throws URISyntaxException {
        log.debug("REST request to save Ocena : {}", ocena);
        if (ocena.getId() != null) {
            throw new BadRequestAlertException("A new ocena cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Ocena result = ocenaRepository.save(ocena);
        return ResponseEntity.created(new URI("/api/ocenas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /ocenas : Updates an existing ocena.
     *
     * @param ocena the ocena to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated ocena,
     * or with status 400 (Bad Request) if the ocena is not valid,
     * or with status 500 (Internal Server Error) if the ocena couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/ocenas")
    public ResponseEntity<Ocena> updateOcena(@RequestBody Ocena ocena) throws URISyntaxException {
        log.debug("REST request to update Ocena : {}", ocena);
        if (ocena.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Ocena result = ocenaRepository.save(ocena);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, ocena.getId().toString()))
            .body(result);
    }

    /**
     * GET  /ocenas : get all the ocenas.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of ocenas in body
     */
    @GetMapping("/ocenas")
    public List<Ocena> getAllOcenas() {
        log.debug("REST request to get all Ocenas");
        return ocenaRepository.findAll();
    }

    /**
     * GET  /ocenas/:id : get the "id" ocena.
     *
     * @param id the id of the ocena to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the ocena, or with status 404 (Not Found)
     */
    @GetMapping("/ocenas/{id}")
    public ResponseEntity<Ocena> getOcena(@PathVariable Long id) {
        log.debug("REST request to get Ocena : {}", id);
        Optional<Ocena> ocena = ocenaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(ocena);
    }

    /**
     * DELETE  /ocenas/:id : delete the "id" ocena.
     *
     * @param id the id of the ocena to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/ocenas/{id}")
    public ResponseEntity<Void> deleteOcena(@PathVariable Long id) {
        log.debug("REST request to delete Ocena : {}", id);
        ocenaRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
