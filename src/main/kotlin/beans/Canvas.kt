package beans

import jakarta.enterprise.context.RequestScoped
import jakarta.faces.application.FacesMessage
import jakarta.faces.context.FacesContext
import jakarta.inject.Inject
import jakarta.inject.Named
import java.io.Serializable

@Named
@RequestScoped
class Canvas: Serializable {
    @Inject
    private lateinit var formBean: RequestBean

    fun execute() {
        val param1: Float = FacesContext.getCurrentInstance().externalContext.requestParameterMap["x"]!!.toFloat()
        val param2: Float = FacesContext.getCurrentInstance().externalContext.requestParameterMap["y"]!!.toFloat()
        val newR = 3
        println("x: $param1, y: $param2")
        formBean.setR(newR.toString())
        formBean.setX(arrayOf(param1 * newR))
        formBean.setY((param2 * newR).toString())
        formBean.applyHit()
    }
}