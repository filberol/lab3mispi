package beans

import HitRecord
import jakarta.annotation.PostConstruct
import jakarta.enterprise.context.ApplicationScoped
import jakarta.inject.Named
import jakarta.persistence.*
import java.io.Serializable

@Named
@ApplicationScoped
open class DataBaseBean: Serializable {
    private val persistenceUnit = "LabPU"
    private var entityManagerFactory: EntityManagerFactory? = null
    private var entityManager: EntityManager? = null
    private var transaction: EntityTransaction? = null

    @PostConstruct
    private fun settleConnection() {
        entityManagerFactory = Persistence.createEntityManagerFactory(persistenceUnit)
        entityManager = entityManagerFactory!!.createEntityManager()
        transaction = entityManager!!.transaction
    }

    open fun loadHits(): ArrayList<*>? {
        try {
            transaction!!.begin()
            val query: Query = entityManager!!.createQuery("SELECT e FROM HitRecord e")
            transaction!!.commit()
            return query.resultList as ArrayList<*>
        } catch (exception: RuntimeException) {
            if (transaction!!.isActive) {
                transaction!!.rollback()
            }
            println("Failed to synchronize lists")
        }
        return null
    }

    open fun saveHits(list: ArrayList<HitRecord>) {
        try {
            transaction!!.begin()
            val query = entityManager!!.createQuery("DELETE FROM HitRecord")
            query.executeUpdate()
            for (element: HitRecord in list) {
                entityManager!!.persist(element)
            }
            transaction!!.commit()
            println("saved list")
        } catch (exception: RuntimeException ) {
            if (transaction!!.isActive) {
                transaction!!.rollback()
            }
            println("unable to save list")
        }
    }
}