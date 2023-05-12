import beans.RequestBean
import org.junit.jupiter.api.Test

class Tests {
    var requestBean: RequestBean = RequestBean()

    @Test
    fun doTest() {
        println("helloworld")
        requestBean.setR("2")
        println(requestBean.getR())
    }
}