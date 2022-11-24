import jakarta.persistence.*
import java.io.Serializable
import java.time.ZonedDateTime
import java.time.format.DateTimeFormatter




@Entity
class HitRecord: Serializable {
    @Id
    @SequenceGenerator(name = "jpaSequence", sequenceName = "JPA_SEQUENCE", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "jpaSequence")
    private var id: Int? = null
    fun setId(id: Int) { this.id = id }
    fun getId() = id

    private var cordX: Float? = null
    fun setCordX(value: Float) {cordX = value}
    fun getCordX() = cordX

    private var cordY: Float? = null
    fun setCordY(value: Float) {cordY = value}
    fun getCordY() = cordY

    private var cordR: Float? = null
    fun setCordR(value: Float) {cordR = value}
    fun getCordR() = cordR

    private var time: ZonedDateTime? = null
    fun setTime(time: ZonedDateTime) { this.time = time }
    fun getTime() = time

    private var execution: Long? = null
    fun setExecution(time: Long) { execution = time }
    fun getExecution() = execution

    private var result: String? = null
    fun setResult(value: String) { result = value }
    fun getResult() = result

    fun cordsToString() = "$cordX, $cordY, $cordR"
    fun timeFormatted(): String =
        time!!.toLocalTime().format(DateTimeFormatter.ofPattern("HH:mm:ss"))
    fun execFormatted() = "$execution ms"
    fun resulted() = result
    override fun toString() = "$cordX, $cordY, $cordR"
}
