package com.onlineschool.app.domain;



import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A Uczen.
 */
@Entity
@Table(name = "uczen")
public class Uczen implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "imie", nullable = false)
    private String imie;

    @NotNull
    @Column(name = "pesel", nullable = false, unique = true)
    private String pesel;

    @NotNull
    @Column(name = "data_urodzenia", nullable = false)
    private LocalDate dataUrodzenia;

    @NotNull
    @Column(name = "email", nullable = false)
    private String email;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getImie() {
        return imie;
    }

    public Uczen imie(String imie) {
        this.imie = imie;
        return this;
    }

    public void setImie(String imie) {
        this.imie = imie;
    }

    public String getPesel() {
        return pesel;
    }

    public Uczen pesel(String pesel) {
        this.pesel = pesel;
        return this;
    }

    public void setPesel(String pesel) {
        this.pesel = pesel;
    }

    public LocalDate getDataUrodzenia() {
        return dataUrodzenia;
    }

    public Uczen dataUrodzenia(LocalDate dataUrodzenia) {
        this.dataUrodzenia = dataUrodzenia;
        return this;
    }

    public void setDataUrodzenia(LocalDate dataUrodzenia) {
        this.dataUrodzenia = dataUrodzenia;
    }

    public String getEmail() {
        return email;
    }

    public Uczen email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
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
        Uczen uczen = (Uczen) o;
        if (uczen.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), uczen.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Uczen{" +
            "id=" + getId() +
            ", imie='" + getImie() + "'" +
            ", pesel='" + getPesel() + "'" +
            ", dataUrodzenia='" + getDataUrodzenia() + "'" +
            ", email='" + getEmail() + "'" +
            "}";
    }
}
