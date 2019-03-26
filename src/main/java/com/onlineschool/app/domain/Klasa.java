package com.onlineschool.app.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Klasa.
 */
@Entity
@Table(name = "klasa")
public class Klasa implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "nazwaklasi", nullable = false, unique = true)
    private String nazwaklasi;

    @ManyToOne
    @JsonIgnoreProperties("klasas")
    private Nauczyciel nauczyciel;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNazwaklasi() {
        return nazwaklasi;
    }

    public Klasa nazwaklasi(String nazwaklasi) {
        this.nazwaklasi = nazwaklasi;
        return this;
    }

    public void setNazwaklasi(String nazwaklasi) {
        this.nazwaklasi = nazwaklasi;
    }

    public Nauczyciel getNauczyciel() {
        return nauczyciel;
    }

    public Klasa nauczyciel(Nauczyciel nauczyciel) {
        this.nauczyciel = nauczyciel;
        return this;
    }

    public void setNauczyciel(Nauczyciel nauczyciel) {
        this.nauczyciel = nauczyciel;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Klasa klasa = (Klasa) o;
        if (klasa.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), klasa.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Klasa{" +
            "id=" + getId() +
            ", nazwaklasi='" + getNazwaklasi() + "'" +
            "}";
    }
}
