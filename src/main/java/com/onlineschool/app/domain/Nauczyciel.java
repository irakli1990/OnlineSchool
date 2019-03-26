package com.onlineschool.app.domain;



import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Nauczyciel.
 */
@Entity
@Table(name = "nauczyciel")
public class Nauczyciel implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "imie", nullable = false)
    private String imie;

    @NotNull
    @Column(name = "nazwisko", nullable = false)
    private String nazwisko;

    @NotNull
    @Column(name = "pesel", nullable = false, unique = true)
    private String pesel;

    @NotNull
    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @NotNull
    @Column(name = "adres", nullable = false)
    private String adres;

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

    public Nauczyciel imie(String imie) {
        this.imie = imie;
        return this;
    }

    public void setImie(String imie) {
        this.imie = imie;
    }

    public String getNazwisko() {
        return nazwisko;
    }

    public Nauczyciel nazwisko(String nazwisko) {
        this.nazwisko = nazwisko;
        return this;
    }

    public void setNazwisko(String nazwisko) {
        this.nazwisko = nazwisko;
    }

    public String getPesel() {
        return pesel;
    }

    public Nauczyciel pesel(String pesel) {
        this.pesel = pesel;
        return this;
    }

    public void setPesel(String pesel) {
        this.pesel = pesel;
    }

    public String getEmail() {
        return email;
    }

    public Nauczyciel email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAdres() {
        return adres;
    }

    public Nauczyciel adres(String adres) {
        this.adres = adres;
        return this;
    }

    public void setAdres(String adres) {
        this.adres = adres;
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
        Nauczyciel nauczyciel = (Nauczyciel) o;
        if (nauczyciel.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), nauczyciel.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Nauczyciel{" +
            "id=" + getId() +
            ", imie='" + getImie() + "'" +
            ", nazwisko='" + getNazwisko() + "'" +
            ", pesel='" + getPesel() + "'" +
            ", email='" + getEmail() + "'" +
            ", adres='" + getAdres() + "'" +
            "}";
    }
}
