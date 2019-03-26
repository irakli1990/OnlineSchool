package com.onlineschool.app.web.rest;

import com.onlineschool.app.OnlineschoolApp;

import com.onlineschool.app.domain.Klasa;
import com.onlineschool.app.repository.KlasaRepository;
import com.onlineschool.app.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;


import static com.onlineschool.app.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the KlasaResource REST controller.
 *
 * @see KlasaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = OnlineschoolApp.class)
public class KlasaResourceIntTest {

    private static final String DEFAULT_NAZWAKLASI = "AAAAAAAAAA";
    private static final String UPDATED_NAZWAKLASI = "BBBBBBBBBB";

    @Autowired
    private KlasaRepository klasaRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restKlasaMockMvc;

    private Klasa klasa;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final KlasaResource klasaResource = new KlasaResource(klasaRepository);
        this.restKlasaMockMvc = MockMvcBuilders.standaloneSetup(klasaResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Klasa createEntity(EntityManager em) {
        Klasa klasa = new Klasa()
            .nazwaklasi(DEFAULT_NAZWAKLASI);
        return klasa;
    }

    @Before
    public void initTest() {
        klasa = createEntity(em);
    }

    @Test
    @Transactional
    public void createKlasa() throws Exception {
        int databaseSizeBeforeCreate = klasaRepository.findAll().size();

        // Create the Klasa
        restKlasaMockMvc.perform(post("/api/klasas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(klasa)))
            .andExpect(status().isCreated());

        // Validate the Klasa in the database
        List<Klasa> klasaList = klasaRepository.findAll();
        assertThat(klasaList).hasSize(databaseSizeBeforeCreate + 1);
        Klasa testKlasa = klasaList.get(klasaList.size() - 1);
        assertThat(testKlasa.getNazwaklasi()).isEqualTo(DEFAULT_NAZWAKLASI);
    }

    @Test
    @Transactional
    public void createKlasaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = klasaRepository.findAll().size();

        // Create the Klasa with an existing ID
        klasa.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restKlasaMockMvc.perform(post("/api/klasas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(klasa)))
            .andExpect(status().isBadRequest());

        // Validate the Klasa in the database
        List<Klasa> klasaList = klasaRepository.findAll();
        assertThat(klasaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNazwaklasiIsRequired() throws Exception {
        int databaseSizeBeforeTest = klasaRepository.findAll().size();
        // set the field null
        klasa.setNazwaklasi(null);

        // Create the Klasa, which fails.

        restKlasaMockMvc.perform(post("/api/klasas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(klasa)))
            .andExpect(status().isBadRequest());

        List<Klasa> klasaList = klasaRepository.findAll();
        assertThat(klasaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllKlasas() throws Exception {
        // Initialize the database
        klasaRepository.saveAndFlush(klasa);

        // Get all the klasaList
        restKlasaMockMvc.perform(get("/api/klasas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(klasa.getId().intValue())))
            .andExpect(jsonPath("$.[*].nazwaklasi").value(hasItem(DEFAULT_NAZWAKLASI.toString())));
    }
    
    @Test
    @Transactional
    public void getKlasa() throws Exception {
        // Initialize the database
        klasaRepository.saveAndFlush(klasa);

        // Get the klasa
        restKlasaMockMvc.perform(get("/api/klasas/{id}", klasa.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(klasa.getId().intValue()))
            .andExpect(jsonPath("$.nazwaklasi").value(DEFAULT_NAZWAKLASI.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingKlasa() throws Exception {
        // Get the klasa
        restKlasaMockMvc.perform(get("/api/klasas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateKlasa() throws Exception {
        // Initialize the database
        klasaRepository.saveAndFlush(klasa);

        int databaseSizeBeforeUpdate = klasaRepository.findAll().size();

        // Update the klasa
        Klasa updatedKlasa = klasaRepository.findById(klasa.getId()).get();
        // Disconnect from session so that the updates on updatedKlasa are not directly saved in db
        em.detach(updatedKlasa);
        updatedKlasa
            .nazwaklasi(UPDATED_NAZWAKLASI);

        restKlasaMockMvc.perform(put("/api/klasas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedKlasa)))
            .andExpect(status().isOk());

        // Validate the Klasa in the database
        List<Klasa> klasaList = klasaRepository.findAll();
        assertThat(klasaList).hasSize(databaseSizeBeforeUpdate);
        Klasa testKlasa = klasaList.get(klasaList.size() - 1);
        assertThat(testKlasa.getNazwaklasi()).isEqualTo(UPDATED_NAZWAKLASI);
    }

    @Test
    @Transactional
    public void updateNonExistingKlasa() throws Exception {
        int databaseSizeBeforeUpdate = klasaRepository.findAll().size();

        // Create the Klasa

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restKlasaMockMvc.perform(put("/api/klasas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(klasa)))
            .andExpect(status().isBadRequest());

        // Validate the Klasa in the database
        List<Klasa> klasaList = klasaRepository.findAll();
        assertThat(klasaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteKlasa() throws Exception {
        // Initialize the database
        klasaRepository.saveAndFlush(klasa);

        int databaseSizeBeforeDelete = klasaRepository.findAll().size();

        // Delete the klasa
        restKlasaMockMvc.perform(delete("/api/klasas/{id}", klasa.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Klasa> klasaList = klasaRepository.findAll();
        assertThat(klasaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Klasa.class);
        Klasa klasa1 = new Klasa();
        klasa1.setId(1L);
        Klasa klasa2 = new Klasa();
        klasa2.setId(klasa1.getId());
        assertThat(klasa1).isEqualTo(klasa2);
        klasa2.setId(2L);
        assertThat(klasa1).isNotEqualTo(klasa2);
        klasa1.setId(null);
        assertThat(klasa1).isNotEqualTo(klasa2);
    }
}
