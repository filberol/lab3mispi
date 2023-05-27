package com.lab3web.beans

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
        println("x: $param1, y: $param2")
        formBean.setX(arrayOf(param1 * 3))
        formBean.setY((param2 * 3).toString())
        formBean.applyHit()
    }
}