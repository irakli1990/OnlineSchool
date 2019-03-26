package com.onlineschool.app.repository;

import com.onlineschool.app.domain.Przedmiot;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Przedmiot entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PrzedmiotRepository extends JpaRepository<Przedmiot, Long> {

}
