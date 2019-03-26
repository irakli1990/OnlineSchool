package com.onlineschool.app.web.rest;

import com.onlineschool.app.OnlineschoolApp;

import com.onlineschool.app.domain.Uczen;
import com.onlineschool.app.repository.UczenRepository;
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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;


import static com.onlineschool.app.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the UczenResource REST controller.
 *
 * @see UczenResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = OnlineschoolApp.class)
public class UczenResourceIntTest {

    private static final String DEFAULT_IMIE = "AAAAAAAAAA";
    private static final String UPDATED_IMIE = "BBBBBBBBBB";

    private static final String DEFAULT_PESEL = "AAAAAAAAAA";
    private static final String UPDATED_PESEL = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATA_URODZENIA = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATA_URODZENIA = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    @Autowired
    private UczenRepository uczenRepository;

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

    private MockMvc restUczenMockMvc;

    private Uczen uczen;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final UczenResource uczenResource = new UczenResource(uczenRepository);
        this.restUczenMockMvc = MockMvcBuilders.standaloneSetup(uczenResource)
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
    public static Uczen createEntity(EntityManager em) {
        Uczen uczen = new Uczen()
            .imie(DEFAULT_IMIE)
            .pesel(DEFAULT_PESEL)
            .dataUrodzenia(DEFAULT_DATA_URODZENIA)
            .email(DEFAULT_EMAIL);
        return uczen;
    }

    @Before
    public void initTest() {
        uczen = createEntity(em);
    }

    @Test
    @Transactional
    public void createUczen() throws Exception {
        int databaseSizeBeforeCreate = uczenRepository.findAll().size();

        // Create the Uczen
        restUczenMockMvc.perform(post("/api/uczens")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(uczen)))
            .andExpect(status().isCreated());

        // Validate the Uczen in the database
        List<Uczen> uczenList = uczenRepository.findAll();
        assertThat(uczenList).hasSize(databaseSizeBeforeCreate + 1);
        Uczen testUczen = uczenList.get(uczenList.size() - 1);
        assertThat(testUczen.getImie()).isEqualTo(DEFAULT_IMIE);
        assertThat(testUczen.getPesel()).isEqualTo(DEFAULT_PESEL);
        assertThat(testUczen.getDataUrodzenia()).isEqualTo(DEFAULT_DATA_URODZENIA);
        assertThat(testUczen.getEmail()).isEqualTo(DEFAULT_EMAIL);
    }

    @Test
    @Transactional
    public void createUczenWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = uczenRepository.findAll().size();

        // Create the Uczen with an existing ID
        uczen.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUczenMockMvc.perform(post("/api/uczens")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(uczen)))
            .andExpect(status().isBadRequest());

        // Validate the Uczen in the database
        List<Uczen> uczenList = uczenRepository.findAll();
        assertThat(uczenList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkImieIsRequired() throws Exception {
        int databaseSizeBeforeTest = uczenRepository.findAll().size();
        // set the field null
        uczen.setImie(null);

        // Create the Uczen, which fails.

        restUczenMockMvc.perform(post("/api/uczens")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(uczen)))
            .andExpect(status().isBadRequest());

        List<Uczen> uczenList = uczenRepository.findAll();
        assertThat(uczenList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPeselIsRequired() throws Exception {
        int databaseSizeBeforeTest = uczenRepository.findAll().size();
        // set the field null
        uczen.setPesel(null);

        // Create the Uczen, which fails.

        restUczenMockMvc.perform(post("/api/uczens")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(uczen)))
            .andExpect(status().isBadRequest());

        List<Uczen> uczenList = uczenRepository.findAll();
        assertThat(uczenList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDataUrodzeniaIsRequired() throws Exception {
        int databaseSizeBeforeTest = uczenRepository.findAll().size();
        // set the field null
        uczen.setDataUrodzenia(null);

        // Create the Uczen, which fails.

        restUczenMockMvc.perform(post("/api/uczens")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(uczen)))
            .andExpect(status().isBadRequest());

        List<Uczen> uczenList = uczenRepository.findAll();
        assertThat(uczenList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEmailIsRequired() throws Exception {
        int databaseSizeBeforeTest = uczenRepository.findAll().size();
        // set the field null
        uczen.setEmail(null);

        // Create the Uczen, which fails.

        restUczenMockMvc.perform(post("/api/uczens")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(uczen)))
            .andExpect(status().isBadRequest());

        List<Uczen> uczenList = uczenRepository.findAll();
        assertThat(uczenList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllUczens() throws Exception {
        // Initialize the database
        uczenRepository.saveAndFlush(uczen);

        // Get all the uczenList
        restUczenMockMvc.perform(get("/api/uczens?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(uczen.getId().intValue())))
            .andExpect(jsonPath("$.[*].imie").value(hasItem(DEFAULT_IMIE.toString())))
            .andExpect(jsonPath("$.[*].pesel").value(hasItem(DEFAULT_PESEL.toString())))
            .andExpect(jsonPath("$.[*].dataUrodzenia").value(hasItem(DEFAULT_DATA_URODZENIA.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())));
    }
    
    @Test
    @Transactional
    public void getUczen() throws Exception {
        // Initialize the database
        uczenRepository.saveAndFlush(uczen);

        // Get the uczen
        restUczenMockMvc.perform(get("/api/uczens/{id}", uczen.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(uczen.getId().intValue()))
            .andExpect(jsonPath("$.imie").value(DEFAULT_IMIE.toString()))
            .andExpect(jsonPath("$.pesel").value(DEFAULT_PESEL.toString()))
            .andExpect(jsonPath("$.dataUrodzenia").value(DEFAULT_DATA_URODZENIA.toString()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingUczen() throws Exception {
        // Get the uczen
        restUczenMockMvc.perform(get("/api/uczens/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUczen() throws Exception {
        // Initialize the database
        uczenRepository.saveAndFlush(uczen);

        int databaseSizeBeforeUpdate = uczenRepository.findAll().size();

        // Update the uczen
        Uczen updatedUczen = uczenRepository.findById(uczen.getId()).get();
        // Disconnect from session so that the updates on updatedUczen are not directly saved in db
        em.detach(updatedUczen);
        updatedUczen
            .imie(UPDATED_IMIE)
            .pesel(UPDATED_PESEL)
            .dataUrodzenia(UPDATED_DATA_URODZENIA)
            .email(UPDATED_EMAIL);

        restUczenMockMvc.perform(put("/api/uczens")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedUczen)))
            .andExpect(status().isOk());

        // Validate the Uczen in the database
        List<Uczen> uczenList = uczenRepository.findAll();
        assertThat(uczenList).hasSize(databaseSizeBeforeUpdate);
        Uczen testUczen = uczenList.get(uczenList.size() - 1);
        assertThat(testUczen.getImie()).isEqualTo(UPDATED_IMIE);
        assertThat(testUczen.getPesel()).isEqualTo(UPDATED_PESEL);
        assertThat(testUczen.getDataUrodzenia()).isEqualTo(UPDATED_DATA_URODZENIA);
        assertThat(testUczen.getEmail()).isEqualTo(UPDATED_EMAIL);
    }

    @Test
    @Transactional
    public void updateNonExistingUczen() throws Exception {
        int databaseSizeBeforeUpdate = uczenRepository.findAll().size();

        // Create the Uczen

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUczenMockMvc.perform(put("/api/uczens")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(uczen)))
            .andExpect(status().isBadRequest());

        // Validate the Uczen in the database
        List<Uczen> uczenList = uczenRepository.findAll();
        assertThat(uczenList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteUczen() throws Exception {
        // Initialize the database
        uczenRepository.saveAndFlush(uczen);

        int databaseSizeBeforeDelete = uczenRepository.findAll().size();

        // Delete the uczen
        restUczenMockMvc.perform(delete("/api/uczens/{id}", uczen.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Uczen> uczenList = uczenRepository.findAll();
        assertThat(uczenList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Uczen.class);
        Uczen uczen1 = new Uczen();
        uczen1.setId(1L);
        Uczen uczen2 = new Uczen();
        uczen2.setId(uczen1.getId());
        assertThat(uczen1).isEqualTo(uczen2);
        uczen2.setId(2L);
        assertThat(uczen1).isNotEqualTo(uczen2);
        uczen1.setId(null);
        assertThat(uczen1).isNotEqualTo(uczen2);
    }
}
