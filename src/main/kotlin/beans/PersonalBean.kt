package beans

import HitRecord
import jakarta.annotation.PostConstruct
import jakarta.annotation.PreDestroy
import jakarta.enterprise.context.SessionScoped
import jakarta.inject.Inject
import jakarta.inject.Named
import java.io.Serializable
import java.util.*


@Named
@SessionScoped
open class PersonalBean: Serializable {
    @Inject
    private lateinit var connectBean: DataBaseBean

    private var records: ArrayList<HitRecord> = ArrayList()
    open fun getRecords() = records
    open fun addRecord(el: HitRecord) {records.add(el)}
    open fun clearRecords() {records.clear()}

    @PostConstruct
    private fun setConnection() {
        records.addAll(connectBean.loadHits() as ArrayList<HitRecord>)
//        val timer = Timer()
//        val task: TimerTask = object : TimerTask() {
//            override fun run() {
//                connectBean.saveHits(records)
//            }
//        }
//        val intervalBackupTime: Long = 3 * 1000 * 60
//        timer.schedule(task, intervalBackupTime ,intervalBackupTime)
    }

    @PreDestroy
    private fun closeConnection() {
        connectBean.saveHits(records)
    }
}