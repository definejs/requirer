# @definejs/requirer

这是一个工具包，不属于 `@definejs` 中的某个模块。

用来提取和分析一个开发包中所有的 require 到的包名，并对比 package.json 中 dependencies 字段中提供的包。  
给出结论是否需要在 dependencies 字段中增加缺少的包，或删除多余的（没有实际 require 到）的包。  
此工具仅用于辅助检查，给出的结论还要结合人工具体识别。  

此包由 `@definejs/cli` 所调用。

