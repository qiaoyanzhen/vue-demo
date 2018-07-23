<template>
  <div class="hello">
			<el-breadcrumb separator-class="el-icon-arrow-right" class='she'>
			  <el-breadcrumb-item :to="{ path: '/' }">设置</el-breadcrumb-item>
			  <el-breadcrumb-item>传真设置</el-breadcrumb-item>
			</el-breadcrumb>
  		<el-row>
  			<el-col :span='24'>
  				<el-row class="first">
  					<el-col :span='3' class="dan">
  							<span>单位名称:</span>
  					</el-col>
  					<el-col :span='5'>
			  				<template>
			  				
								  <el-select v-model="value8" filterable placeholder="请选择">
								  	
								    <el-option
								      v-for="item in options"
								      :key="item.value"
								      :label="item.label"
								      :value="item.value">
								    </el-option>
								  </el-select>
								</template>
  					</el-col>
  					<el-col :span="3" class='dan'>
  						<span>传真号码:</span>
  					</el-col>
  					<el-col :span="5">
  						<el-input v-model="input" placeholder="请输入内容"></el-input>
  					</el-col>
  					<el-col :span='8'>
  						 <el-button type="primary" plain>查询</el-button>
  						 <el-button plain>重置</el-button>
  					</el-col>
  				</el-row>
  				<el-row class='two'>
  						 <el-button type="primary"   @click="show" class='primary'>添加</el-button>
  						   <template style="margin-bottom: 15px;">
									  <el-table
									    :data="tableData"
									    
									    >

									    <el-table-column label="操作" fixed="left"  width='400px' align=center>
									      <template slot-scope="scope">
									        <el-button type='primary' plain
									          size="mini"
									          @click="handleEdit(scope.$index,scope.row)">编辑</el-button>
									        <el-button
									          size="mini"
									          plain
									          type="primary"
									          @click="deleteRow(scope.$index, tableData)">删除</el-button>
									      </template>
									    </el-table-column><!--:formatter="formatter" -->
									    <el-table-column prop="name"
									      label="接收传真单位名称"
									      width="280"  align=center>
									      <template slot-scope="scope">
									           {{ scope.row.name }}
									           
									 <!--<el-popover
										  placement="top-start"
										  title="标题"
										  width="200"
										  trigger="hover"
										  :content="scope.row.name">
										  <el-button slot="reference">hover 激活</el-button>
									</el-popover>-->
									           <!--<el-button v-if="scope.row.type==1">1</el-button>
									           <el-button v-else-if="scope.row.type==2">2</el-button>
									           <el-button v-else-if="scope.row.type==3">3</el-button>
									           <el-button v-else-if="scope.row.type==4">4</el-button>-->
									      </template>
									    </el-table-column>
									    <el-table-column
									      label="传真号"
									      width="280"
									      align=center>
									      <template slot-scope="scope">
									        <span style="margin-left: 10px">{{ scope.row.date }}</span>
									      </template>
									    </el-table-column>
									    <el-table-column
									      label="传真号"
									      width="280"
									      align=center>
									      <template slot-scope="scope">
									        <span style="margin-left: 10px">{{ scope.row.date }}</span>
									      </template>
									    </el-table-column>
									    <el-table-column
									      label="传真号"
									      width="280"
									      align=center>
									      <template slot-scope="scope">
									        <span style="margin-left: 10px">{{ scope.row.date }}</span>
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
							    
							  <el-dialog title="添加"
							  	 :visible.sync="dialogFormVisible" 
							  	 width='35%'
							  	 >
									  <el-form :model="form">
									    <el-form-item label="单位名称" :label-width="formLabelWidth">
									      <el-input v-model="form.name" auto-complete="off" placeholder="请输入"></el-input>
									    </el-form-item>
									    <el-form-item label="传真号码" :label-width="formLabelWidth">
									      <el-input v-model="form.region" auto-complete="off" placeholder="请输入" style='width: 50%;'></el-input>
									      	分机
									      <el-input v-model="form.region1" auto-complete="off" placeholder="请输入" style='width: 30%;'></el-input>
									      
									      </el-select>
									    </el-form-item>
									  </el-form>
									  <div slot="footer" class="dialog-footer" style="text-align: center;">
									    <el-button @click="dialogFormVisible = false;qx()" >取 消</el-button>
									    <el-button type="primary" @click="ok()">确 定</el-button>
									  </div>
									</el-dialog>
									<el-dialog
													  title="编辑"
													  :visible.sync="centerDialogVisible"
													  width="30%"
													  center>
													  <label class="label">单位名称：</label><el-input v-model="inputName" style='width: 200px;' placeholder="请输入内容"></el-input>
													 <br><label class="label">传真号：</label> <el-input v-model="inputNum" style='width: 200px;' placeholder="请输入内容"></el-input>
													  <span slot="footer" class="dialog-footer">
													    <el-button @click="centerDialogVisible = false">取 消</el-button>
													    <el-button type="primary" @click="kk()">确 定</el-button>
													  </span>
									</el-dialog>
  				</el-row>
  			</el-col>
  		
  			
  		</el-row>
 
  </div>
</template>

<script>
export default {
    data (){
      return {
      	rowIndex:'',
      	input:'',
      	input1:'',
      	input2:'',
      	input3:'',
      	inputName:'',
      	inputNum:'',
      	dialogTableVisible: false,
        dialogFormVisible: false,
        centerDialogVisible: false,
        form: {
          name: '',
          region: '',
          region1:'',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
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
          type: 1
        }, {
          date: '2016-05-04',
          name: '王小虎',
          type: 4
          
        }, {
          date: '2016-05-01',
          name: '王小虎',
          type: 3
          
        }, {
          date: '2016-05-03',
          name: '王小虎',
          type: 2
          
        }],
        value8: '',
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4,
        
      }
      },
  methods:{
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
  	
  	
		 handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      handleEdit(index, row) {
      	//row[index]
      	this.centerDialogVisible = true;
      	this.inputName = row.name
      	this.inputNum = row.date;
      	this.rowIndex = index;
       
      },
      kk(){
      	this.centerDialogVisible = false;
   
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
      	this.dialogFormVisible = true
      },
      qx(){
      	//alert('llll')
      	this.form.name='';
      	this.form.region='';
      	this.form.region1=''
      },
      ok(){
      
      	if(this.form.region=='' || this.form.region1=="" || this.form.name==""){
        this.dialogFormVisible=true,
        
         this.$alert('请填写完整！', '友情提示', {
          confirmButtonText: '确定',
          
        });
   
      	}else{
      		this.dialogFormVisible = false;
      		this.tableData.unshift({
          date:this.form.region+this.form.region1,
          name: this.form.name,
          address:''
        })
      	this.form.name='';
      	this.form.region='';
      	this.form.region1='';
      	}
      	
      //alert('ggg')
      }
       
  },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello{background: #ebeef5;}
.hello .first{background: #fff;margin: 30px 15px;border-radius: 5px;padding: 20px;}
.first .dan{margin-top: 10px;display: inline-block;text-align: center;}
.hello .two{background: #fff;border-radius: 5px;margin: 15px;padding:20px}
.two .primary{float: left;width: 80px;height: 40px;margin-bottom: 10px;}
.el-pager li{background: #ccc;}
.hello .she{padding: 15px 0 0 20px;}
.two .label{width: 100px;display: inline-block;text-align: right;line-height: 50px;}
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
	background:red;
	font-size:16px;
	color:#fff;
}
</style>
<style>
	::-webkit-scrollbar  
{  
    width: 10px;  
    height: 10px;  
    background-color: #F5F5F5;  
} 

::-webkit-scrollbar-thumb 
{ 
    border-radius: 10px; 
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3); 
    background-color: #555; 
} 

::-webkit-scrollbar-track 
{ 
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
    border-radius: 10px; 
    background-color: #F5F5F5; 
} 
	.hello .sdd{
		background:yellow;
	}
	.two .el-table th{background: #ebeef5;border-radius: 5px;border-right:3px solid #fff;}
</style>
