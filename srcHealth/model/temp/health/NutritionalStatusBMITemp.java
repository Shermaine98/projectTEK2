/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package model.temp.health;

/**
 *
 * @author Shermaine
 */
public class NutritionalStatusBMITemp {
     private String BMI;
    private String maleCount;
    private String femaleCount;
    private String totalCount;

    /**
     * @return the BMI
     */
    public String getBMI() {
        return BMI;
    }

    /**
     * @param BMI the BMI to set
     */
    public void setBMI(String BMI) {
        this.BMI = BMI;
    }

    /**
     * @return the maleCount
     */
    public String getMaleCount() {
        return maleCount;
    }

    /**
     * @param maleCount the maleCount to set
     */
    public void setMaleCount(String maleCount) {
        this.maleCount = maleCount;
    }

    /**
     * @return the femaleCount
     */
    public String getFemaleCount() {
        return femaleCount;
    }

    /**
     * @param femaleCount the femaleCount to set
     */
    public void setFemaleCount(String femaleCount) {
        this.femaleCount = femaleCount;
    }

    /**
     * @return the totalCount
     */
    public String getTotalCount() {
        return totalCount;
    }

    /**
     * @param totalCount the totalCount to set
     */
    public void setTotalCount(String totalCount) {
        this.totalCount = totalCount;
    }
}