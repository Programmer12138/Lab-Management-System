/*此java类是对采购订单信息的描述
 *
 * created by heyuanfly 2020-12-25
 *
 * */
package model;

public class BuyInfo {

    private String buyId;
    private int buyNum;
    private String equipName;
    private String seller;//学院名称
    private String buyer;//厂家名称
    private float money;
    private String buyDate;

    public BuyInfo(String buyId, int buyNum, String equipName, String seller, String buyer,
                   String buyDate,Float money) {
        super();
        this.buyId = buyId;
        this.buyNum = buyNum;
        this.equipName = equipName;
        this.setSeller(seller);
        this.setBuyer(buyer);
        this.money = money;
        this.buyDate = buyDate;
    }

    public BuyInfo() {
        super();
    }

    public String getBuyDate() {
        return buyDate;
    }

    public void setBuyDate(String buyDate) {
        this.buyDate = buyDate;
    }

    public float getMoney() {
        return money;
    }

    public void setMoney(float money) {
        this.money = money;
    }

    public String getEquipName() {
        return equipName;
    }

    public void setEquipName(String equipName) {
        this.equipName = equipName;
    }

    public int getBuyNum() {
        return buyNum;
    }

    public void setBuyNum(int buyNum) {
        this.buyNum = buyNum;
    }

    public String getBuyId() {
        return buyId;
    }

    public void setBuyId(String buyId) {
        this.buyId = buyId;
    }

    public String getBuyer() {
        return buyer;
    }

    public void setBuyer(String buyer) {
        this.buyer = buyer;
    }

    public String getSeller() {
        return seller;
    }

    public void setSeller(String seller) {
        this.seller = seller;
    }

}
