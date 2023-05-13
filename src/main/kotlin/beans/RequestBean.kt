package beans

import HitRecord
import jakarta.enterprise.context.SessionScoped
import jakarta.inject.Inject
import jakarta.inject.Named
import java.io.Serializable
import java.time.ZonedDateTime
import kotlin.math.round

@Named
@SessionScoped
open class RequestBean : Serializable {
    @Suppress("CdiUnproxyableBeanTypesInspection")
    @Inject
    private lateinit var personalBean: PersonalBean

    private var x: Array<Float>? = null
    open fun getX() = x
    open fun setX(value: Array<Float>) {
        x = value
    }

    private var y: String? = null
    open fun getY() = y
    open fun setY(value: String) {
        y = value
    }

    private var r: String? = "1"
    open fun getR() = r
    open fun setR(value: String) {
        r = value
    }

    open fun clearRecords() {
        personalBean.clearRecords()
    }

    open fun applyHit() {
        if (x.isNullOrEmpty()) return
        val stamp = System.currentTimeMillis()
        for (xVal in x!!) {
            val yVal = y!!.toFloat()
            val rVal = r!!.toFloat()
            if (!checkRanges(xVal, yVal, rVal)) return
            val check = checkHit(xVal, yVal, rVal)
            addRecord(xVal, yVal, rVal, stamp, check)
        }
    }

    open fun checkRanges(x: Float, y: Float, r: Float): Boolean {
        if (x < -3 || x > 5) return false
        if (y < -5 || y > 3) return false
        if (r < 1 || r > 3) return false
        return true
    }

    private fun checkHit(x: Float, y: Float, r: Float): HitResult {
        return if (x <= 0) {
            if (y <= 0) checkCircle(x, y, r)
            else checkRectangle(x, y, r)
        } else {
            if (y <= 0) HitResult.FAIL
            else checkTriangle(x, y, r)
        }
    }

    open fun addRecord(x: Float, y: Float, r: Float, stamp: Long, result: HitResult) {
        personalBean.addRecord(HitRecord().apply {
            setCordX(x); setCordY(y); setCordR(r)
            setTime(ZonedDateTime.now())
            setExecution(System.currentTimeMillis() - stamp)
            setResult(result.toString())
        })
    }

    companion object Checker {
        fun checkCircle(x: Float, y: Float, r: Float): HitResult {
            return if (x * x + y * y <= r * r) HitResult.SUCCESS else HitResult.FAIL
        }

        fun checkTriangle(x: Float, y: Float, r: Float): HitResult {
            return if (x + y <= r) HitResult.SUCCESS else HitResult.FAIL
        }

        @Suppress("UNUSED_PARAMETER")
        fun checkRectangle(x: Float, y: Float, r: Float): HitResult {
            return if (y <= r / 2) HitResult.SUCCESS else HitResult.FAIL
        }
    }

    enum class HitResult(private val str: String) {
        SUCCESS("Hit"),
        FAIL("Miss");

        override fun toString() = str
    }

    override fun toString(): String {
        val number = x!![0] * 10
        return "Owner: " + "has a point X: " + round(number) / 10 + " Y: " + y.toString() + " " +
                "Result: "+ y?.let { r?.let { it1 -> checkRanges(round(number) / 10, it.toFloat(), it1.toFloat()) } }
    }

}