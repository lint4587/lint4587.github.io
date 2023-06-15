	/*新建檔案*/
    $scope.newFile =function(){
        $scope.showdiv();
       
   };

   $scope.showdiv=function(){
    $('#my_dialog').dialog({
        modal:true,
        width:"400",
        height:"223"
        });
    document.getElementById("my_dialog").style.display="block";
};

$scope.create_paper_cancel=function(){
    console.info("取消");
       $("#create_name").val("");
    $("#create_author").val("");
    $("#create_type").empty(); 
    var ops={
               "總結報告":"總結報告",
               "輔助授課":"輔助授課",
               "其他":"其他"
           };
    var parent=document.getElementById("create_type");
    for(var key in ops)
    {
        var o = new Option(ops[key],key);
        parent.appendChild(o);
         
    }
       $('#my_dialog').dialog("close");
};

$scope.create_paper_save=function(){
    $('#my_dialog').dialog("close");
    $scope.create_name = document.getElementById("create_name").value; 
    var create_author = document.getElementById("create_author").value;   
    var create_type = document.getElementById("create_type").value;   
    var data={filename:$scope.create_name,author:create_author,type:create_type};
    Document.create_paper_save(data,$http, function (response) {
       // 進一步的操作
        newFileextend();
   }, function () {
       alert("儲存失敗！");
   })
};