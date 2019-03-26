package com.onlineschool.app.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Ocena.
 */
@Entity
@Table(name = "ocena")
public class Ocena implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "rodzaj")
    private Double rodzaj;

    @ManyToOne
    @JsonIgnoreProperties("ocenas")
    private Uczen uczen;

    @ManyToOne
    @JsonIgnoreProperties("ocenas")
    private Przedmiot przedmiot;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getRodzaj() {
        return rodzaj;
    }

    public Ocena rodzaj(Double rodzaj) {
        this.rodzaj = rodzaj;
        return this;
    }

    public void setRodzaj(Double rodzaj) {
        this.rodzaj = rodzaj;
    }

    public Uczen getUczen() {
        return uczen;
    }

    public Ocena uczen(Uczen uczen) {
        this.uczen = uczen;
        return this;
    }

    public void setUczen(Uczen uczen) {
        this.uczen = uczen;
    }

    public Przedmiot getPrzedmiot() {
        return przedmiot;
    }

    public Ocena przedmiot(Przedmiot przedmiot) {
        this.przedmiot = przedmiot;
        return this;
    }

    public void setPrzedmiot(Przedmiot przedmiot) {
        this.przedmiot = przedmiot;
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
        Ocena ocena = (Ocena) o;
        if (ocena.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), ocena.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Ocena{" +
            "id=" + getId() +
            ", rodzaj=" + getRodzaj() +
            "}";
    }
}
