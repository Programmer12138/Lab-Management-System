package dao;

import model.BuyInfo;
import util.DbcpUtils;

import java.sql.*;

public class BuyDao {
    //从数据库读出数据，转化成buyinfo对象
    public BuyInfo[] findAllBuyInfo() throws SQLException {
        Connection conn = DbcpUtils.getConnection();
        //求出buyinfo数组长度
        int length = 0;
        String sql = "select count(*) as 总数 from buy";
        Statement st = conn.createStatement();
        ResultSet rs = st.executeQuery(sql);
        while (rs.next() == true) {
            length = rs.getInt("总数");
        }
        sql = "select * from buy,producer,college "
                + "where buy.college_no=college.college_no and "
                + "buy.producer_no=producer.producer_no "
                + "order by Buy_Id asc";
        rs = st.executeQuery(sql);
        BuyInfo bi[];
        bi = new BuyInfo[length];
        int i = 0;
        while (rs.next() == true) {
            bi[i] = new BuyInfo();
            bi[i].setMoney(rs.getFloat("money"));
            bi[i].setBuyId(rs.getString("Buy_Id"));
            bi[i].setBuyer(rs.getString("college_name"));
            bi[i].setSeller(rs.getString("producer_name"));
            bi[i].setBuyDate(rs.getString("buy_time"));
            bi[i].setBuyNum(rs.getInt("buy_num"));
            bi[i].setEquipName(rs.getString("equip_name"));
            if (i < length) i++;
        }
        return bi;
    }

    //往buy表里面插入一行
    public String addBuy(BuyInfo e) {
        Connection conn = null;
        Statement st = null;
        ResultSet rs = null;
        try {
            conn = DbcpUtils.getConnection();
            String college_no = e.getBuyer();
            String producer_no = e.getSeller();
            String buy_id = e.getBuyId();
            int buy_num = e.getBuyNum();
            String equip_name = e.getEquipName();
            String buy_time = e.getBuyDate();
            Float money = e.getMoney();
            //往buy表里插入信息
            String sql = "insert into buy(college_no,equip_name,producer_no,buy_num,buy_time,money) values(?,?,?,?,?,?)";
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setString(1, college_no);
            ps.setString(2, equip_name);
            ps.setString(3, producer_no);
            ps.setInt(4, buy_num);
            ps.setString(5, buy_time);
            ps.setFloat(6, money);
            int ret = ps.executeUpdate();
            return "true";
        } catch (Exception er) {
            er.printStackTrace();
            return "false";
        }
    }

    public String deleteBuy(String buy_id) {
        Connection conn = null;
        Statement st = null;
        ResultSet rs = null;
        try {
            conn = DbcpUtils.getConnection();
            String sql = "delete from buy where Buy_Id=?";
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setString(1, buy_id);
            int ret = ps.executeUpdate();
            return "true";
        } catch (Exception e) {
            e.printStackTrace();
            return "false";
        }
    }

    public String updateBuy(BuyInfo e) {
        Connection conn = null;
        Statement st = null;
        ResultSet rs = null;
        try {
            conn = DbcpUtils.getConnection();
            //更新buy表
            String sql = "update buy set college_no=?, equip_name=?, producer_no=?, buy_num=?, money=?, buy_time=? where Buy_Id=?";
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setString(1, e.getBuyer());
            ps.setString(2, e.getEquipName());
            ps.setString(3, e.getSeller());
            ps.setInt(4, e.getBuyNum());
            ps.setFloat(5, e.getMoney());
            ps.setString(6, e.getBuyDate());
            ps.setString(7, e.getBuyId());
            int ret = ps.executeUpdate();
            return "true";
        } catch (Exception er) {
            er.printStackTrace();
            return "false";
        }
    }
}
