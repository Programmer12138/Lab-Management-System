package model;

public class EquipInfo {
    // equipinfo的属性
    private String equipId;
    private String equipName;
    private String producerName;
    private float price;
    private String location;
    private String charger;
    private String addDate;

    // equipinfo对象的构造方法

    public EquipInfo() {
        super();
    }

    public EquipInfo(String equipId, String equipName, String producerName,
                     float price, String location, String charger, String addDate) {
        super();
        this.equipId = equipId;
        this.equipName = equipName;
        this.producerName = producerName;
        this.price = price;
        this.location = location;
        this.charger = charger;
        this.addDate = addDate;
    }

    // equipinfo属性的获取和赋值方法
    public String getEquipId() {
        return equipId;
    }

    public void setEquipId(String equipId) {
        this.equipId = equipId;
    }

    public String getEquipName() {
        return equipName;
    }

    public void setEquipName(String equipName) {
        this.equipName = equipName;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(Float price) {

        this.price = price;
    }

    public String getAddDate() {
        return addDate;
    }

    public void setAddDate(String addDate) {
        this.addDate = addDate;
    }

    public String getProducerName() {
        return producerName;
    }

    public void setProducerName(String producerName) {
        this.producerName = producerName;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getCharger() {
        return charger;
    }

    public void setCharger(String charger) {
        this.charger = charger;
    }
}
