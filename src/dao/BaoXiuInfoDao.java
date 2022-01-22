package dao;

import model.BaoXiuInfo;
import util.DbcpUtils;

import java.io.Serializable;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class BaoXiuInfoDao implements Serializable {
    //把从数据库中读出的把报修信息存入数组
    public BaoXiuInfo[] roMapping(ResultSet rs) {
        List<BaoXiuInfo> equips = new ArrayList<>();
        try {
            while (rs.next()) {
                BaoXiuInfo equip = new BaoXiuInfo(
                        Integer.toString(rs.getInt("baoxiu_id")),
                        rs.getString("sno").trim(),
                        rs.getString("sname"),
                        rs.getString("equip_id").trim(),
                        rs.getString("equip_name").trim(),
                        rs.getString("building").trim() + "-"
                                + rs.getString("room").trim() + "-"
                                + rs.getString("rname").trim(),
                        rs.getString("status").trim(),
                        rs.getString("time").trim());
                equips.add(equip);
            }
            System.out.println("报修记录读取完毕！");
            return equips.toArray(new BaoXiuInfo[0]);
        } catch (Exception e) {
            e.printStackTrace();
            return new BaoXiuInfo[0];
        }
    }

    //读取报修信息
    public BaoXiuInfo[] findAllBaoXiuInfos() {
        Connection conn = null;
        Statement st = null;
        ResultSet rs = null;
        try {
            conn = DbcpUtils.getConnection();
            System.out.println("数据库连接成功！");
            st = conn.createStatement(); // 向前+只读
            String sql = "" +
                    "select baoxiu_id," +
                    "b.sno,sname,b.equip_id,equip_name," +
                    "building,room,rname,status,time " +
                    " from equipment as e,baoxiu as b , student as s, place as p" +
                    " where e.equip_id = b.equip_id and b.sno = s.sno and e.place_id=p.place_id";
            rs = st.executeQuery(sql);
            return this.roMapping(rs);
        } catch (Exception e) {
            e.printStackTrace();
            return new BaoXiuInfo[0];
        }
    }

    //添加报修信息
    public boolean addBaoXiu(BaoXiuInfo b) {
        Connection conn = null;
        Statement st = null;
        ResultSet rs = null;
        try {
            conn = DbcpUtils.getConnection();
            String sql = "insert into baoxiu values(?,?,?,?)";
            PreparedStatement ps = conn.prepareStatement(sql);

            String equip_id = b.getEquipId();
            String status = b.getStatus();
            String baoXiuDate = b.getBaoXiuDate();
            String sno = b.getSno();
            ps.setString(1, sno);
            ps.setString(2, equip_id);
            ps.setString(3, baoXiuDate);
            ps.setString(4, status);
            int ret = ps.executeUpdate();
            if (ret > 0) return true;
            else return false;
        } catch (Exception er) {
            er.printStackTrace();
            return false;
        }
    }


    //根据ID删除报修记录
    public String deleteBaoXiu(String baoXiuId) {
        Connection conn = null;
        Statement st = null;
        ResultSet rs = null;
        try {
            conn = DbcpUtils.getConnection();
            String sql = "delete from baoxiu where baoxiu_id=?";
            PreparedStatement ps = conn.prepareStatement(sql);
            int i = Integer.parseInt(baoXiuId);
            System.out.println(i + "号报修记录将被删除");
            ps.setInt(1, i);
            int ret = ps.executeUpdate();
            return "true";
        } catch (Exception e) {
            e.printStackTrace();
            return "false";
        }
    }

    //更新报修信息
    public String updateBaoXiu(BaoXiuInfo b) {
        Connection conn = null;
        Statement st = null;
        ResultSet rs = null;
        try {
            conn = DbcpUtils.getConnection();
            String sql = "update baoxiu set status=?  where baoxiu_id=?";
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setString(1, b.getStatus());
            int i = Integer.parseInt(b.getBaoXiuId());
            ps.setInt(2, i);
            int ret = ps.executeUpdate();
            System.out.println(b.getBaoXiuId() + "号报修状态修改为" + b.getStatus());
            return "true";
        } catch (Exception er) {
            er.printStackTrace();
            return "false";
        }
    }

}

