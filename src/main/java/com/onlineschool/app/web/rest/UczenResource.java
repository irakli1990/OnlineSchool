package com.onlineschool.app.web.rest;
import com.onlineschool.app.domain.Uczen;
import com.onlineschool.app.repository.UczenRepository;
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
 * REST controller for managing Uczen.
 */
@RestController
@RequestMapping("/api")
public class UczenResource {

    private final Logger log = LoggerFactory.getLogger(UczenResource.class);

    private static final String ENTITY_NAME = "uczen";

    private final UczenRepository uczenRepository;

    public UczenResource(UczenRepository uczenRepository) {
        this.uczenRepository = uczenRepository;
    }

    /**
     * POST  /uczens : Create a new uczen.
     *
     * @param uczen the uczen to create
     * @return the ResponseEntity with status 201 (Created) and with body the new uczen, or with status 400 (Bad Request) if the uczen has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/uczens")
    public ResponseEntity<Uczen> createUczen(@Valid @RequestBody Uczen uczen) throws URISyntaxException {
        log.debug("REST request to save Uczen : {}", uczen);
        if (uczen.getId() != null) {
            throw new BadRequestAlertException("A new uczen cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Uczen result = uczenRepository.save(uczen);
        return ResponseEntity.created(new URI("/api/uczens/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /uczens : Updates an existing uczen.
     *
     * @param uczen the uczen to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated uczen,
     * or with status 400 (Bad Request) if the uczen is not valid,
     * or with status 500 (Internal Server Error) if the uczen couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/uczens")
    public ResponseEntity<Uczen> updateUczen(@Valid @RequestBody Uczen uczen) throws URISyntaxException {
        log.debug("REST request to update Uczen : {}", uczen);
        if (uczen.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Uczen result = uczenRepository.save(uczen);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, uczen.getId().toString()))
            .body(result);
    }

    /**
     * GET  /uczens : get all the uczens.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of uczens in body
     */
    @GetMapping("/uczens")
    public List<Uczen> getAllUczens() {
        log.debug("REST request to get all Uczens");
        return uczenRepository.findAll();
    }

    /**
     * GET  /uczens/:id : get the "id" uczen.
     *
     * @param id the id of the uczen to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the uczen, or with status 404 (Not Found)
     */
    @GetMapping("/uczens/{id}")
    public ResponseEntity<Uczen> getUczen(@PathVariable Long id) {
        log.debug("REST request to get Uczen : {}", id);
        Optional<Uczen> uczen = uczenRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(uczen);
    }

    /**
     * DELETE  /uczens/:id : delete the "id" uczen.
     *
     * @param id the id of the uczen to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/uczens/{id}")
    public ResponseEntity<Void> deleteUczen(@PathVariable Long id) {
        log.debug("REST request to delete Uczen : {}", id);
        uczenRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
