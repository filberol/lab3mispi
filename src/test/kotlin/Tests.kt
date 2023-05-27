import com.lab3web.beans.RequestBean
import org.junit.jupiter.api.Assertions.assertEquals
//import junit.framework.Assert.assertEquals
import org.junit.jupiter.api.Test
import kotlin.math.round

class Tests {
    private var requestBean: RequestBean = RequestBean()

    @Test
    fun doTest() {
        println("helloworld")
        requestBean.setR("2")
        println(requestBean.getR())
    }


    @Test
    fun testXY() {
        requestBean.setR(1.toString())
        var i = -3.0
        while (i <= 5) {
            var j = -5.0
            while (j <= 3) {
                requestBean.setX(arrayOf(i.toFloat()))
                requestBean.setY(j.toString())
                requestBean.getR()?.let { requestBean.checkRanges(i.toFloat(), j.toFloat(), it.toFloat()) }
                val number = i * 10
                val result = "Owner: has a point X: ${round(number)/10} Y: $j Result: true"

                assertEquals(requestBean.toString(), result)
                j += 0.1
            }
            i += 0.1
        }
    }
}