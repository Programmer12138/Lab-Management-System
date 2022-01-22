package dao;

import model.EquipInfo;
import util.DbcpUtils;

import java.io.Serializable;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class EquipInfoDao implements Serializable {
    //把从数据库中读出的器材信息存入数组
    public EquipInfo[] roMapping(ResultSet rs) {
        List<EquipInfo> equips = new ArrayList<>();
        try {
            while (rs.next()) {
                EquipInfo equip = new EquipInfo(rs.getString("equip_id").trim(),
                        rs.getString("equip_name").trim(),
                        rs.getString("producer_name").trim(),
                        rs.getFloat("price"),
                        rs.getString("building").trim() + "-"
                                + rs.getString("room").trim() + "-"
                                + rs.getString("rname").trim(),
                        rs.getString("tname").trim(),
                        rs.getString("add_date").trim());
                equips.add(equip);
            }
            return equips.toArray(new EquipInfo[0]);
        } catch (Exception e) {
            e.printStackTrace();
            return new EquipInfo[0];
        }
    }

    //读取器材信息
    public EquipInfo[] findAllEquipInfo2() {
        Connection conn = null;
        Statement st = null;
        ResultSet rs = null;
        try {
            conn = DbcpUtils.getConnection();
            st = conn.createStatement(); // 向前+只读
            String sql = "select equip_id,equip_name,price,add_date,producer_name,tname,building,room,rname " +
                    " from equipment as e, producer as p, teacher as t, place as pl " +
                    " where e.producer_no = p.producer_no and e.tno = t.tno and e.place_id=pl.place_id";
            rs = st.executeQuery(sql);
            return this.roMapping(rs);
        } catch (Exception e) {
            e.printStackTrace();
            return new EquipInfo[0];
        }
    }

    //添加器材
    public String addEquip(EquipInfo e) {
        Connection conn = null;
        Statement st = null;
        ResultSet rs = null;
        try {
            conn = DbcpUtils.getConnection();

            String sql = "insert into equipment values(?,?,?,?,?,?,?)";
            PreparedStatement ps = conn.prepareStatement(sql);

            String equip_id = e.getEquipId();
            String producer_no = getProducerNoByName(e.getProducerName(), conn);
            String tno = getTnoByCharger(e.getCharger(), conn);
            String place_id = getPlaceIdByLoc(e.getLocation(), conn);
            String equip_name = e.getEquipName();
            String add_date = e.getAddDate();
            float price = e.getPrice();

            ps.setString(1, equip_id);
            ps.setString(2, producer_no);
            ps.setString(3, tno);
            ps.setString(4, place_id);
            ps.setString(5, equip_name);
            ps.setFloat(6, price);
            ps.setString(7, add_date);
            int ret = ps.executeUpdate();
            return "数据插入成功！";
        } catch (Exception er) {
            er.printStackTrace();
            return "数据插入失败！";
        }
    }


    //通过producerName获得producer_no
    public String getProducerNoByName(String producerName, Connection conn) {
        try {
            Statement st = conn.createStatement(); // 向前+只读
            String sql = "select producer_no from producer where producer_name=" + "'" + producerName + "'";
            ResultSet rs = st.executeQuery(sql);
            while (rs.next()) {
                return rs.getString("producer_no");
            }
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("生产商出错！");

        }
        return null;
    }

    //通过location获得place_id
    public String getPlaceIdByLoc(String location, Connection conn) {
        String[] array = location.split("-");
        try {
            Statement st = conn.createStatement(); // 向前+只读
            String sql = "select place_id from place where building=" + "'" + array[0] + "'" + " and room=" + "'" + array[1] + "'" + " and rname=" + "'" + array[2] + "'";
            ResultSet rs = st.executeQuery(sql);
            while (rs.next()) {
                return rs.getString("place_id");
            }
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("location出错！");

        }
        return null;
    }

    //通过charger获得tno
    public String getTnoByCharger(String charger, Connection conn) {
        try {
            Statement st = conn.createStatement(); // 向前+只读
            String sql = "select tno from teacher where tname=" + "'" + charger + "'";
            ResultSet rs = st.executeQuery(sql);
            while (rs.next()) {
                return rs.getString("tno");
            }
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("teacher出错！");

        }
        return null;
    }

    //根据ID删除器材
    public String deleteEquip(String equipId) {
        Connection conn = null;
        Statement st = null;
        ResultSet rs = null;
        try {
            conn = DbcpUtils.getConnection();
            String sql = "delete from equipment where equip_id=?";
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setString(1, equipId);
            int ret = ps.executeUpdate();
            return "true";
        } catch (Exception e) {
            e.printStackTrace();
            return "false";
        }
    }

    //更新器材信息
    public String updateEquip(EquipInfo e) {
        Connection conn = null;
        Statement st = null;
        ResultSet rs = null;
        try {
            conn = DbcpUtils.getConnection();
            String sql = "update equipment set producer_no=?, tno=?, place_id=? ,equip_name=?, price=?, add_date=? where equip_id=?";
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setString(1, getProducerNoByName(e.getProducerName(), conn));
            ps.setString(2, getTnoByCharger(e.getCharger(), conn));
            ps.setString(3, getPlaceIdByLoc(e.getLocation(), conn));
            ps.setString(4, e.getEquipName());
            ps.setFloat(5, e.getPrice());
            ps.setString(6, e.getAddDate());
            ps.setString(7, e.getEquipId());
            int ret = ps.executeUpdate();
            return "数据更新成功！";
        } catch (Exception er) {
            er.printStackTrace();
            return "数据更新失败！";
        }
    }
//测试用
//	public static void main(String[] args) {
//		EquipInfoDao dao = new EquipInfoDao();
//		EquipInfo2[] equips = dao.findAllEquipInfo2();
//		for (EquipInfo2 equip : equips)
//			System.out.prStringln("equipId:" + equip.getEquipId() + ",equipName:"
//					+ equip.getEquipName() + ",producerName:"
//					+ equip.getProducerName() + ",price:" + equip.getPrice()
//					+ ",location:" + equip.getLocation() + ",charger:"
//					+ equip.getCharger() + ",addDate:" + equip.getAddDate());
//	}

}
