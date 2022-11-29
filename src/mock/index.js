import Mock from "mockjs"
import {demoData} from "@/mock/data/demo"

Mock.mock('news/api','get',demoData);
