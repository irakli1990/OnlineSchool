package com.onlineschool.app.repository;

import com.onlineschool.app.domain.Klasa;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Klasa entity.
 */
@SuppressWarnings("unused")
@Repository
public interface KlasaRepository extends JpaRepository<Klasa, Long> {

}
