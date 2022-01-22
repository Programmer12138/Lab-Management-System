package dao;

import model.CollegeInfo;
import util.DbcpUtils;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;

public class CollegeDao {
    //从数据库中获取密码用于验证
    public String getPassword(String college_no) {
        Connection conn = null;
        Statement st = null;
        ResultSet rs = null;
        try {
            conn = DbcpUtils.getConnection();
            st = conn.createStatement(); // 向前+只读
            String sql = "select password from college where college_no=" + "'" + college_no + "'";
            rs = st.executeQuery(sql);
            while (rs.next()) {
                return rs.getString("password");
            }
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("密码读取错误！");

        }
        return null;
    }

    public String checkPassword(String college_no, String inputPassword) {
        //本方法用于学院登录的时候判断密码是否正确
        //从数据库中获得真实的密码
        if (checkAccountRepeat(college_no)) {//如果账号存在
            String realPassword = getPassword(college_no);
            if (realPassword.equals(inputPassword)) {
                return "true";
            } else return "false";
        } else return "false";
    }

    //检测账号是否重复
    public boolean checkAccountRepeat(String account) {
        Connection conn = null;
        Statement st = null;
        ResultSet rs = null;
        try {
            conn = DbcpUtils.getConnection();
            st = conn.createStatement();
            String sql = "select college_no from college ";
            rs = st.executeQuery(sql);
            while (rs.next()) {
                String a = rs.getString("college_no");
                if (a.equals(account)) {
                    return true;
                }
            }
            return false;
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("账号读取错误！");
            return true;
        }
    }

    //注册账号
    public boolean insertAccount(CollegeInfo c) {
        Connection conn = null;
        Statement st = null;
        ResultSet rs = null;
        try {
            conn = DbcpUtils.getConnection();
            String sql = "insert into college values(?,?,?)";
            PreparedStatement ps = conn.prepareStatement(sql);

            String college_no = c.getCollegeId();
            String college_name = c.getCollegeName();
            String password = c.getPassword();

            ps.setString(1, college_no);
            ps.setString(2, college_name);
            ps.setString(3, password);
            int ret = ps.executeUpdate();
            if (ret > 0) return true;
            else return false;
        } catch (Exception er) {
            er.printStackTrace();
            return false;
        }
    }
}

