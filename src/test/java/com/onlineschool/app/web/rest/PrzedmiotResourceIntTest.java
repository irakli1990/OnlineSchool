package com.onlineschool.app.web.rest;

import com.onlineschool.app.OnlineschoolApp;

import com.onlineschool.app.domain.Przedmiot;
import com.onlineschool.app.repository.PrzedmiotRepository;
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
 * Test class for the PrzedmiotResource REST controller.
 *
 * @see PrzedmiotResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = OnlineschoolApp.class)
public class PrzedmiotResourceIntTest {

    private static final String DEFAULT_NAZWA = "AAAAAAAAAA";
    private static final String UPDATED_NAZWA = "BBBBBBBBBB";

    @Autowired
    private PrzedmiotRepository przedmiotRepository;

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

    private MockMvc restPrzedmiotMockMvc;

    private Przedmiot przedmiot;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PrzedmiotResource przedmiotResource = new PrzedmiotResource(przedmiotRepository);
        this.restPrzedmiotMockMvc = MockMvcBuilders.standaloneSetup(przedmiotResource)
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
    public static Przedmiot createEntity(EntityManager em) {
        Przedmiot przedmiot = new Przedmiot()
            .nazwa(DEFAULT_NAZWA);
        return przedmiot;
    }

    @Before
    public void initTest() {
        przedmiot = createEntity(em);
    }

    @Test
    @Transactional
    public void createPrzedmiot() throws Exception {
        int databaseSizeBeforeCreate = przedmiotRepository.findAll().size();

        // Create the Przedmiot
        restPrzedmiotMockMvc.perform(post("/api/przedmiots")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(przedmiot)))
            .andExpect(status().isCreated());

        // Validate the Przedmiot in the database
        List<Przedmiot> przedmiotList = przedmiotRepository.findAll();
        assertThat(przedmiotList).hasSize(databaseSizeBeforeCreate + 1);
        Przedmiot testPrzedmiot = przedmiotList.get(przedmiotList.size() - 1);
        assertThat(testPrzedmiot.getNazwa()).isEqualTo(DEFAULT_NAZWA);
    }

    @Test
    @Transactional
    public void createPrzedmiotWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = przedmiotRepository.findAll().size();

        // Create the Przedmiot with an existing ID
        przedmiot.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPrzedmiotMockMvc.perform(post("/api/przedmiots")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(przedmiot)))
            .andExpect(status().isBadRequest());

        // Validate the Przedmiot in the database
        List<Przedmiot> przedmiotList = przedmiotRepository.findAll();
        assertThat(przedmiotList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNazwaIsRequired() throws Exception {
        int databaseSizeBeforeTest = przedmiotRepository.findAll().size();
        // set the field null
        przedmiot.setNazwa(null);

        // Create the Przedmiot, which fails.

        restPrzedmiotMockMvc.perform(post("/api/przedmiots")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(przedmiot)))
            .andExpect(status().isBadRequest());

        List<Przedmiot> przedmiotList = przedmiotRepository.findAll();
        assertThat(przedmiotList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllPrzedmiots() throws Exception {
        // Initialize the database
        przedmiotRepository.saveAndFlush(przedmiot);

        // Get all the przedmiotList
        restPrzedmiotMockMvc.perform(get("/api/przedmiots?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(przedmiot.getId().intValue())))
            .andExpect(jsonPath("$.[*].nazwa").value(hasItem(DEFAULT_NAZWA.toString())));
    }
    
    @Test
    @Transactional
    public void getPrzedmiot() throws Exception {
        // Initialize the database
        przedmiotRepository.saveAndFlush(przedmiot);

        // Get the przedmiot
        restPrzedmiotMockMvc.perform(get("/api/przedmiots/{id}", przedmiot.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(przedmiot.getId().intValue()))
            .andExpect(jsonPath("$.nazwa").value(DEFAULT_NAZWA.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPrzedmiot() throws Exception {
        // Get the przedmiot
        restPrzedmiotMockMvc.perform(get("/api/przedmiots/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePrzedmiot() throws Exception {
        // Initialize the database
        przedmiotRepository.saveAndFlush(przedmiot);

        int databaseSizeBeforeUpdate = przedmiotRepository.findAll().size();

        // Update the przedmiot
        Przedmiot updatedPrzedmiot = przedmiotRepository.findById(przedmiot.getId()).get();
        // Disconnect from session so that the updates on updatedPrzedmiot are not directly saved in db
        em.detach(updatedPrzedmiot);
        updatedPrzedmiot
            .nazwa(UPDATED_NAZWA);

        restPrzedmiotMockMvc.perform(put("/api/przedmiots")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPrzedmiot)))
            .andExpect(status().isOk());

        // Validate the Przedmiot in the database
        List<Przedmiot> przedmiotList = przedmiotRepository.findAll();
        assertThat(przedmiotList).hasSize(databaseSizeBeforeUpdate);
        Przedmiot testPrzedmiot = przedmiotList.get(przedmiotList.size() - 1);
        assertThat(testPrzedmiot.getNazwa()).isEqualTo(UPDATED_NAZWA);
    }

    @Test
    @Transactional
    public void updateNonExistingPrzedmiot() throws Exception {
        int databaseSizeBeforeUpdate = przedmiotRepository.findAll().size();

        // Create the Przedmiot

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPrzedmiotMockMvc.perform(put("/api/przedmiots")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(przedmiot)))
            .andExpect(status().isBadRequest());

        // Validate the Przedmiot in the database
        List<Przedmiot> przedmiotList = przedmiotRepository.findAll();
        assertThat(przedmiotList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePrzedmiot() throws Exception {
        // Initialize the database
        przedmiotRepository.saveAndFlush(przedmiot);

        int databaseSizeBeforeDelete = przedmiotRepository.findAll().size();

        // Delete the przedmiot
        restPrzedmiotMockMvc.perform(delete("/api/przedmiots/{id}", przedmiot.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Przedmiot> przedmiotList = przedmiotRepository.findAll();
        assertThat(przedmiotList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Przedmiot.class);
        Przedmiot przedmiot1 = new Przedmiot();
        przedmiot1.setId(1L);
        Przedmiot przedmiot2 = new Przedmiot();
        przedmiot2.setId(przedmiot1.getId());
        assertThat(przedmiot1).isEqualTo(przedmiot2);
        przedmiot2.setId(2L);
        assertThat(przedmiot1).isNotEqualTo(przedmiot2);
        przedmiot1.setId(null);
        assertThat(przedmiot1).isNotEqualTo(przedmiot2);
    }
}
