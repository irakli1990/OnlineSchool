package com.onlineschool.app.web.rest;

import com.onlineschool.app.OnlineschoolApp;

import com.onlineschool.app.domain.Nauczyciel;
import com.onlineschool.app.repository.NauczycielRepository;
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
 * Test class for the NauczycielResource REST controller.
 *
 * @see NauczycielResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = OnlineschoolApp.class)
public class NauczycielResourceIntTest {

    private static final String DEFAULT_IMIE = "AAAAAAAAAA";
    private static final String UPDATED_IMIE = "BBBBBBBBBB";

    private static final String DEFAULT_NAZWISKO = "AAAAAAAAAA";
    private static final String UPDATED_NAZWISKO = "BBBBBBBBBB";

    private static final String DEFAULT_PESEL = "AAAAAAAAAA";
    private static final String UPDATED_PESEL = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_ADRES = "AAAAAAAAAA";
    private static final String UPDATED_ADRES = "BBBBBBBBBB";

    @Autowired
    private NauczycielRepository nauczycielRepository;

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

    private MockMvc restNauczycielMockMvc;

    private Nauczyciel nauczyciel;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final NauczycielResource nauczycielResource = new NauczycielResource(nauczycielRepository);
        this.restNauczycielMockMvc = MockMvcBuilders.standaloneSetup(nauczycielResource)
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
    public static Nauczyciel createEntity(EntityManager em) {
        Nauczyciel nauczyciel = new Nauczyciel()
            .imie(DEFAULT_IMIE)
            .nazwisko(DEFAULT_NAZWISKO)
            .pesel(DEFAULT_PESEL)
            .email(DEFAULT_EMAIL)
            .adres(DEFAULT_ADRES);
        return nauczyciel;
    }

    @Before
    public void initTest() {
        nauczyciel = createEntity(em);
    }

    @Test
    @Transactional
    public void createNauczyciel() throws Exception {
        int databaseSizeBeforeCreate = nauczycielRepository.findAll().size();

        // Create the Nauczyciel
        restNauczycielMockMvc.perform(post("/api/nauczyciels")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nauczyciel)))
            .andExpect(status().isCreated());

        // Validate the Nauczyciel in the database
        List<Nauczyciel> nauczycielList = nauczycielRepository.findAll();
        assertThat(nauczycielList).hasSize(databaseSizeBeforeCreate + 1);
        Nauczyciel testNauczyciel = nauczycielList.get(nauczycielList.size() - 1);
        assertThat(testNauczyciel.getImie()).isEqualTo(DEFAULT_IMIE);
        assertThat(testNauczyciel.getNazwisko()).isEqualTo(DEFAULT_NAZWISKO);
        assertThat(testNauczyciel.getPesel()).isEqualTo(DEFAULT_PESEL);
        assertThat(testNauczyciel.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testNauczyciel.getAdres()).isEqualTo(DEFAULT_ADRES);
    }

    @Test
    @Transactional
    public void createNauczycielWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = nauczycielRepository.findAll().size();

        // Create the Nauczyciel with an existing ID
        nauczyciel.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restNauczycielMockMvc.perform(post("/api/nauczyciels")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nauczyciel)))
            .andExpect(status().isBadRequest());

        // Validate the Nauczyciel in the database
        List<Nauczyciel> nauczycielList = nauczycielRepository.findAll();
        assertThat(nauczycielList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkImieIsRequired() throws Exception {
        int databaseSizeBeforeTest = nauczycielRepository.findAll().size();
        // set the field null
        nauczyciel.setImie(null);

        // Create the Nauczyciel, which fails.

        restNauczycielMockMvc.perform(post("/api/nauczyciels")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nauczyciel)))
            .andExpect(status().isBadRequest());

        List<Nauczyciel> nauczycielList = nauczycielRepository.findAll();
        assertThat(nauczycielList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNazwiskoIsRequired() throws Exception {
        int databaseSizeBeforeTest = nauczycielRepository.findAll().size();
        // set the field null
        nauczyciel.setNazwisko(null);

        // Create the Nauczyciel, which fails.

        restNauczycielMockMvc.perform(post("/api/nauczyciels")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nauczyciel)))
            .andExpect(status().isBadRequest());

        List<Nauczyciel> nauczycielList = nauczycielRepository.findAll();
        assertThat(nauczycielList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPeselIsRequired() throws Exception {
        int databaseSizeBeforeTest = nauczycielRepository.findAll().size();
        // set the field null
        nauczyciel.setPesel(null);

        // Create the Nauczyciel, which fails.

        restNauczycielMockMvc.perform(post("/api/nauczyciels")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nauczyciel)))
            .andExpect(status().isBadRequest());

        List<Nauczyciel> nauczycielList = nauczycielRepository.findAll();
        assertThat(nauczycielList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEmailIsRequired() throws Exception {
        int databaseSizeBeforeTest = nauczycielRepository.findAll().size();
        // set the field null
        nauczyciel.setEmail(null);

        // Create the Nauczyciel, which fails.

        restNauczycielMockMvc.perform(post("/api/nauczyciels")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nauczyciel)))
            .andExpect(status().isBadRequest());

        List<Nauczyciel> nauczycielList = nauczycielRepository.findAll();
        assertThat(nauczycielList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAdresIsRequired() throws Exception {
        int databaseSizeBeforeTest = nauczycielRepository.findAll().size();
        // set the field null
        nauczyciel.setAdres(null);

        // Create the Nauczyciel, which fails.

        restNauczycielMockMvc.perform(post("/api/nauczyciels")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nauczyciel)))
            .andExpect(status().isBadRequest());

        List<Nauczyciel> nauczycielList = nauczycielRepository.findAll();
        assertThat(nauczycielList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllNauczyciels() throws Exception {
        // Initialize the database
        nauczycielRepository.saveAndFlush(nauczyciel);

        // Get all the nauczycielList
        restNauczycielMockMvc.perform(get("/api/nauczyciels?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(nauczyciel.getId().intValue())))
            .andExpect(jsonPath("$.[*].imie").value(hasItem(DEFAULT_IMIE.toString())))
            .andExpect(jsonPath("$.[*].nazwisko").value(hasItem(DEFAULT_NAZWISKO.toString())))
            .andExpect(jsonPath("$.[*].pesel").value(hasItem(DEFAULT_PESEL.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].adres").value(hasItem(DEFAULT_ADRES.toString())));
    }
    
    @Test
    @Transactional
    public void getNauczyciel() throws Exception {
        // Initialize the database
        nauczycielRepository.saveAndFlush(nauczyciel);

        // Get the nauczyciel
        restNauczycielMockMvc.perform(get("/api/nauczyciels/{id}", nauczyciel.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(nauczyciel.getId().intValue()))
            .andExpect(jsonPath("$.imie").value(DEFAULT_IMIE.toString()))
            .andExpect(jsonPath("$.nazwisko").value(DEFAULT_NAZWISKO.toString()))
            .andExpect(jsonPath("$.pesel").value(DEFAULT_PESEL.toString()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()))
            .andExpect(jsonPath("$.adres").value(DEFAULT_ADRES.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingNauczyciel() throws Exception {
        // Get the nauczyciel
        restNauczycielMockMvc.perform(get("/api/nauczyciels/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateNauczyciel() throws Exception {
        // Initialize the database
        nauczycielRepository.saveAndFlush(nauczyciel);

        int databaseSizeBeforeUpdate = nauczycielRepository.findAll().size();

        // Update the nauczyciel
        Nauczyciel updatedNauczyciel = nauczycielRepository.findById(nauczyciel.getId()).get();
        // Disconnect from session so that the updates on updatedNauczyciel are not directly saved in db
        em.detach(updatedNauczyciel);
        updatedNauczyciel
            .imie(UPDATED_IMIE)
            .nazwisko(UPDATED_NAZWISKO)
            .pesel(UPDATED_PESEL)
            .email(UPDATED_EMAIL)
            .adres(UPDATED_ADRES);

        restNauczycielMockMvc.perform(put("/api/nauczyciels")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedNauczyciel)))
            .andExpect(status().isOk());

        // Validate the Nauczyciel in the database
        List<Nauczyciel> nauczycielList = nauczycielRepository.findAll();
        assertThat(nauczycielList).hasSize(databaseSizeBeforeUpdate);
        Nauczyciel testNauczyciel = nauczycielList.get(nauczycielList.size() - 1);
        assertThat(testNauczyciel.getImie()).isEqualTo(UPDATED_IMIE);
        assertThat(testNauczyciel.getNazwisko()).isEqualTo(UPDATED_NAZWISKO);
        assertThat(testNauczyciel.getPesel()).isEqualTo(UPDATED_PESEL);
        assertThat(testNauczyciel.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testNauczyciel.getAdres()).isEqualTo(UPDATED_ADRES);
    }

    @Test
    @Transactional
    public void updateNonExistingNauczyciel() throws Exception {
        int databaseSizeBeforeUpdate = nauczycielRepository.findAll().size();

        // Create the Nauczyciel

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restNauczycielMockMvc.perform(put("/api/nauczyciels")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nauczyciel)))
            .andExpect(status().isBadRequest());

        // Validate the Nauczyciel in the database
        List<Nauczyciel> nauczycielList = nauczycielRepository.findAll();
        assertThat(nauczycielList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteNauczyciel() throws Exception {
        // Initialize the database
        nauczycielRepository.saveAndFlush(nauczyciel);

        int databaseSizeBeforeDelete = nauczycielRepository.findAll().size();

        // Delete the nauczyciel
        restNauczycielMockMvc.perform(delete("/api/nauczyciels/{id}", nauczyciel.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Nauczyciel> nauczycielList = nauczycielRepository.findAll();
        assertThat(nauczycielList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Nauczyciel.class);
        Nauczyciel nauczyciel1 = new Nauczyciel();
        nauczyciel1.setId(1L);
        Nauczyciel nauczyciel2 = new Nauczyciel();
        nauczyciel2.setId(nauczyciel1.getId());
        assertThat(nauczyciel1).isEqualTo(nauczyciel2);
        nauczyciel2.setId(2L);
        assertThat(nauczyciel1).isNotEqualTo(nauczyciel2);
        nauczyciel1.setId(null);
        assertThat(nauczyciel1).isNotEqualTo(nauczyciel2);
    }
}
