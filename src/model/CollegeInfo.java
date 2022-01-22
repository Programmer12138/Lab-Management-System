/*此java类是对学院对象的描述
 *
 * created by heyuanfly 2020-12-25
 *
 * */
package model;

public class CollegeInfo {
    private String collegeId;
    private String collegeName;
    private String password;

    public CollegeInfo() {
    }

    public CollegeInfo(String collegeId, String collegeName, String password) {
        this.collegeId = collegeId;
        this.collegeName = collegeName;
        this.password = password;
    }

    public String getCollegeId() {
        return collegeId;
    }

    public void setCollegeId(String collegeId) {
        this.collegeId = collegeId;
    }

    public String getCollegeName() {
        return collegeName;
    }

    public void setCollegeName(String collegeName) {
        this.collegeName = collegeName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
