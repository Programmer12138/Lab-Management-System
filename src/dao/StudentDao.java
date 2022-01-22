package dao;

import util.DbcpUtils;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;

public class StudentDao {
    //判断学号是否存在
    public int isExistSno(String sno) {
        Connection conn = null;
        Statement st = null;
        ResultSet rs = null;
        try {
            conn = DbcpUtils.getConnection();
            st = conn.createStatement();
            String sql = "select count(*) as c from student where sno=" + "'" + sno + "'";
            rs = st.executeQuery(sql);
            int row = 0;
            while (rs.next()) {
                row = rs.getInt("c");
            }
            return row;
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }
}
