<template>
  <div class="hello">
    <el-breadcrumb separator-class="el-icon-arrow-right" class='she'>
      <el-breadcrumb-item :to="{ path: '/' }">角色管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
      <el-col :span='24'>
        <el-row class="first">
          <el-col :span='3' class="dan">
            <span>角色名称:</span>
          </el-col>
          <el-col :span='5'>
            <el-input v-model="input" placeholder="请选择"></el-input>

          </el-col>
          <el-col :span="3" class='dan'>
            <span>系统区分:</span>
          </el-col>
          <el-col :span="5">
            <template>
              <el-select v-model="value8" filterable clearable placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </template>
          </el-col>
          <el-col :span='8'>
            <el-button type="primary" plain class='but'>查询</el-button>
            <el-button plain class='but'>重置</el-button>
          </el-col>
        </el-row>
        <el-row class='two'>
          <el-button type="primary" @click="show" class='primary but'>新增角色</el-button>
          <template style="margin-bottom: 15px;">
            <el-table
              :data="tableData"

            >

              <el-table-column label="操作" fixed="left" width='300px' align=center>
                <template slot-scope="scope">
                  <el-button
                    type='primary'
                    plain
                    size="mini"
                    @click="handleEdit(scope.$index,scope.row)">编辑

                  </el-button>
                  <el-button
                    type='primary'
                    plain
                    size="mini"
                    @click="handleSee(scope.$index,scope.row)">查看

                  </el-button>
                  <el-button
                    size="mini"
                    plain
                    type="primary"
                    @click="deleteRow(scope.$index, tableData)">删除

                  </el-button>
                </template>
              </el-table-column>

              <el-table-column prop="name"
                               label="角色名称"
                               width="250" align=center>
                <template slot-scope="scope">
                  {{ scope.row.name }}


                </template>
              </el-table-column>

              <el-table-column
                label="所属系统"
                width="250"
                align=center>
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="描述"
                width="250"
                align=center>
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.desc }}</span>
                </template>
              </el-table-column>
            </el-table>
          </template>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :background=true
            :current-page="currentPage4"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400"
          >
          </el-pagination>

          <el-dialog :title="title"
                     :visible.sync="dialogFormVisible"
                     width='35%'
          >
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="角色名称" prop="name">
                <el-input v-model="ruleForm.name" placeholder='请输入角色名称' :disabled="isTrue"></el-input>
              </el-form-item>
              <el-form-item label="系统区分" prop="region">
                <el-select v-model="ruleForm.region" style='width: 100%;' :disabled="isTrue" placeholder="请选择">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="描述" prop="name">
                <el-input v-model="ruleForm.desc" placeholder='请输入描述' :disabled="isTrue"></el-input>
              </el-form-item>
              <el-form-item label="配置权限" prop="name">
                <el-input
                  placeholder="输入关键字进行过滤"
                  v-model="filterText">
                </el-input>

                <el-tree
                  class="filter-tree"
                  :data="data2"
                  show-checkbox
                  highlight-current
                  node-key="id"
                  :props="defaultProps"
                  default-expand-all
                  :filter-node-method="filterNode"
                  ref="tree2" style='height: 200px;overflow: auto;'>
                </el-tree>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" style="text-align: center;">
              <el-button @click="dialogFormVisible = false;qx()">取 消</el-button>
              <el-button type="primary" v-show="!isTrue" @click="submitForm('ruleForm')">确 定</el-button>
            </div>
          </el-dialog>

        </el-row>
      </el-col>


    </el-row>

  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    watch: {
      filterText(val) {
        this.$refs.tree2.filter(val);

      }
    },
    data (){
      return {
        isTrue:false,
        flag: 1,//1:新增2:编辑3:查看
        title: '新增角色权限',
        filterText: '',
        data2: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        rowIndex: '',
        input: '',
        input1: '',
        input2: '',
        input3: '',
        inputName: '',
        inputNum: '',
        dialogTableVisible: false,
        dialogFormVisible: false,
        form: {
          name: '',
          region: '',
          region1: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        ruleForm: {
          name: '',
          desc: '',
          region: '',
          arr: [],
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        rules: {
          name: [
            {required: true, message: '请输入活动名称', trigger: 'blur'},
            {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ],
          region: [
            {required: true, message: '请选择活动区域', trigger: 'change'}
          ],
          date1: [
            {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
          ],
          date2: [
            {type: 'date', required: true, message: '请选择时间', trigger: 'change'}
          ],
          type: [
            {type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change'}
          ],
          resource: [
            {required: true, message: '请选择活动资源', trigger: 'change'}
          ],
          desc: [
            {required: true, message: '请填写活动形式', trigger: 'blur'}
          ]
        },
        formLabelWidth: '120px',
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],

        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          desc: 'ddd',
          type: 1
        }, {
          date: '2016-05-04',
          name: '王小虎',
          desc: 'ddd',
          type: 4

        }, {
          date: '2016-05-01',
          name: '王小虎',
          desc: 'ddd',
          type: 3

        }, {
          date: '2016-05-03',
          name: '王小虎',
          desc: 'ddd',
          type: 2

        }],
        value8: '',
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4,

      }

    },
    created: function () {
      //http://jspang.com/DemoApi/oftenGoods.php

      var that = this
      axios.get('http://localhost:8080/static/add.json')
        .then(function (response) {
          that.data2 = response.data.data
          that.data2.forEach(function(item,index){
              item.disabled = false
          })

        })
        .catch(function (error) {
          console.log(error);
        });
    },

    methods: {
      filterNode(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      },

      formatter(val) {
        return val.name;
//		if(val.type === 1) {
//
//			return   <p class="sb">213211</p>;
////			return   '傻逼1';
//		}else if(val.type === 2){
//			 return '傻逼2';
//		}else if(val.type === 3){
//			 return '傻逼3';
//		}else if(val.type === 4){
//			 return '傻逼4';
//		}
      },
      submitForm(formName) {

        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
            this.dialogFormVisible = false;
            console.log(this.flag)
            if(this.flag==1){
              this.tableData.unshift({
                date: this.ruleForm.region,
                name: this.ruleForm.name,
                desc: this.ruleForm.desc,
                arr: this.$refs.tree2.getCheckedKeys()
              })

            }
            if(this.flag==2){
              this.tableData[this.rowIndex].name = this.ruleForm.name
              this.tableData[this.rowIndex].desc = this.ruleForm.desc
              this.tableData[this.rowIndex].region = this.ruleForm.region
              this.tableData[this.rowIndex].arr = this.$refs.tree2.getCheckedKeys()
            }


              console.log(this.$refs.tree2.getCheckedKeys());
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },

      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      handleEdit(index, row) {
        //row[index]
        this.flag = 2;
        this.isTrue=false;
        this.title = '编辑角色权限';
        this.dialogFormVisible = true;
        this.ruleForm.name = row.name
        this.ruleForm.region = row.date;
        this.ruleForm.desc = row.desc;
        this.$refs.tree2.setCheckedKeys(row.arr);
        this.rowIndex = index;
      },
      handleSee(index, row) {
        //row[index]
        this.flag = 3;
        this.isTrue = true;
        this.title = '查看角色权限';
        this.dialogFormVisible = true;
        this.ruleForm.name = row.name
        this.ruleForm.region = row.date;
        this.ruleForm.desc = row.desc;
        this.$refs.tree2.setCheckedKeys(row.arr);
        this.rowIndex = index;
        console.log(this.$refs.tree2.root)

      },
      kk(){
        this.dialogFormVisible = false;
        this.tableData[this.rowIndex].name = this.inputName
        this.tableData[this.rowIndex].date = this.inputNum

        //console.log(row[index].date);
      },
      deleteRow(index, rows) {

        this.$confirm('确定删除这条信息吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          rows.splice(index, 1);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },

      show(){
        this.flag = 1;
        this.isTrue=false
        this.title = '新增角色权限';
        this.dialogFormVisible = true
        this.ruleForm.region = '';
        this.ruleForm.name = '';
        this.ruleForm.desc = '';
        this.$refs.tree2.setCheckedKeys([])
      },
      qx(){
        this.ruleForm.region = '';
        this.ruleForm.name = '';
        this.ruleForm.desc = '';
        this.$refs.tree2.setCheckedKeys([])
      },
      ok(){

        if (this.form.region == '' || this.form.region1 == "" || this.form.name == "") {
          this.dialogFormVisible = true,

            this.$alert('请填写完整！', '友情提示', {
              confirmButtonText: '确定',

            });

        } else {
          this.dialogFormVisible = false;
          this.tableData.unshift({
            date: this.form.region + this.form.region1,
            name: this.form.name,
            address: ''
          })
          this.form.name = '';
          this.form.region = '';
          this.form.region1 = '';
        }

        //alert('ggg')
      }

    },

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .hello {
    background: #ebeef5;
  }

  .hello .first {
    background: #fff;
    margin: 30px 15px;
    border-radius: 5px;
    padding: 20px;
  }

  .first .dan {
    margin-top: 10px;
    display: inline-block;
    text-align: center;
  }

  .hello .two {
    background: #fff;
    border-radius: 5px;
    margin: 15px;
    padding: 20px
  }

  .two .primary {
    float: left;
    width: 100px;
    height: 40px;
    margin-bottom: 10px;
  }

  .el-pager li {
    background: #ccc;
  }

  .hello .she {
    padding: 15px 0 0 20px;
  }

  .two .label {
    width: 100px;
    display: inline-block;
    text-align: right;
    line-height: 50px;
  }

  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  a {
    color: #42b983;
  }

  /*.el-table thead{background: #909399;}*/

  .sb {
    background: red;
    font-size: 16px;
    color: #fff;
  }
</style>
<style>
  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
    background-color: #F5F5F5;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
    background-color: #555;
  }

  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: #F5F5F5;
  }

  .hello .sdd {
    background: yellow;
  }

  .two .el-table th {
    background: #ebeef5;
    border-radius: 5px;
    border-right: 3px solid #fff;
  }

  .but {
    width: 100px;
  }
</style>
