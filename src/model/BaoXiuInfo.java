/*此java类是对报修信息的描述，从数据库取出的信息将存储在baoxiuinfo对象中，
 * 用于前端显示，注意不是对数据库表的严格描述，而是用于显示和更改等其他操作
 *
 * created by heyuanfly 2020-12-25
 *
 * */
package model;

public class BaoXiuInfo {
    // 对象属性
    private String baoXiuId;
    private String sno;
    private String sname;
    private String equipId;
    private String equipName;
    private String location;
    private String status;
    private String baoXiuDate;

    public BaoXiuInfo(String baoXiuId, String sno, String sname,
                      String equipId, String equipName, String location, String status,
                      String baoXiuDate) {
        super();
        this.setBaoXiuId(baoXiuId);
        this.setSno(sno);
        this.setSname(sname);
        this.setEquipId(equipId);
        this.setEquipName(equipName);
        this.setLocation(location);
        this.setStatus(status);
        this.setBaoXiuDate(baoXiuDate);
    }

    public BaoXiuInfo(String sno, String equipId, String status,
                      String baoXiuDate) {
        super();
        this.setSno(sno);
        this.setEquipId(equipId);
        this.setStatus(status);
        this.setBaoXiuDate(baoXiuDate);
    }

    public BaoXiuInfo(String baoXiuId, String status) {
        super();
        this.setBaoXiuId(baoXiuId);
        this.setStatus(status);

    }

    public BaoXiuInfo() {
        super();
    }

    public String getBaoXiuId() {
        return baoXiuId;
    }

    public void setBaoXiuId(String baoXiuId) {
        this.baoXiuId = baoXiuId;
    }

    public String getSno() {
        return sno;
    }

    public void setSno(String sno) {
        this.sno = sno;
    }

    public String getSname() {
        return sname;
    }

    public void setSname(String sname) {
        this.sname = sname;
    }

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

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getBaoXiuDate() {
        return baoXiuDate;
    }

    public void setBaoXiuDate(String baoXiuDate) {
        this.baoXiuDate = baoXiuDate;
    }

}
