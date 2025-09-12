import React from 'react';
import { Form, Input, Row, Col,Checkbox,Select,InputNumber,Radio,Card } from 'antd';
import { MedicalHistory} from '../types/FormData';
import  DynamicSelect from './DynamicSelect';

interface MedicalHistoryStepProps {
  data: MedicalHistory;
  onDataChange: (data: Partial<MedicalHistory>) => void;
}

const MedicalHistoryStep: React.FC<MedicalHistoryStepProps> = ({ data, onDataChange }) => {
  const isFemale=data.personalInfo.gender==='male'?false:true
  data=data.medicalHistory;
  const handleFieldChange = (field: keyof MedicalHistory, value: string) => {
    onDataChange({ [field]: value });
    alert(JSON.stringify({ [field]: value }));
  };

  const illHistoryOptions = ['无','高血压', '心脏搭桥手术', '高血脂','高血糖','多次流产','前列腺手术','痔疮手术','剖腹产'];
  const painPartOptions = ['头','颈','肩','肘','背','腰','膝','手腕','足踝'];
  
  const painKindOptions = ['胀痛','刺痛','冷痛','灼痛','隐痛','绞痛','重痛','酸痛','空痛','挚痛','固定痛','走串痛'];
  const stomachFeelingOptions = ['胃胀','反酸','烧心','嗳气','打嗝','恶心想吐','喝水即吐','其他','喷射性呕吐' ];
  const phlegmOptions = ['痰多','痰少','无痰','黄绿浓痰','痰清稀入水','痰白略粘','褐色痰','痰中带血','黑色痰' ];
  const peeSymptomOptions = ['无','尿频','尿急','尿痛','尿不尽','尿无力'];
  const {Option} = Select;

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">问诊信息</h2>
        <p className="text-gray-600">调理目标及主诉-（最明显、最痛苦的主要症状及伴随症状（最想解决的问题））</p>
      </div>

      <Form layout="vertical" className="max-w-4xl mx-auto">
        <Card>
        <Form.Item 
          label="病情描述" 
          required
          rules={[{ required: true, message: '调理目标及主诉（最明显、最痛苦的主要症状及伴随症状（最想解决的问题）' }]}
        >
          <Input.TextArea
            rows={4}
            placeholder="平常心绞痛、胸闷气短的症状减轻，心脏病叹气的喘气声基本听不到了，犯病频率和次数都少了，犯病症状轻，这周心脏病犯病没有吃药"
            value={data.currentSymptoms}
            onChange={(e) => handleFieldChange('currentSymptoms', e.target.value)}
          />
        </Form.Item>

        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item label="症状产生原因和时间"
                        required>
              <Input.TextArea
                rows={4}
                placeholder="初次发病时间及原因?"
                value={data.symptomDuration}
                onChange={(e) => handleFieldChange('symptomDuration', e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Row gutter={8}>
            <Form.Item label="既往病史、基础史、手术史">
              <Checkbox.Group options={illHistoryOptions} defaultValue={data.illHistory} onChange={(value) => handleFieldChange('illHistory', value)} />
            </Form.Item>
            </Row>
            <Row gutter={8} >
             <Col xs={12} md={6}>
              <Form.Item label="肿瘤病史:">
              <Input
                size="small"
                placeholder="肺癌 肝癌 ... "
                value={data.tumorHistory}
                onChange={(e) => handleFieldChange('tumorHistory', e.target.value)}
              />              
              </Form.Item>
             </Col>
              <Col xs={12} md={6}>
              <Form.Item label="其它手术:">
              <Input
                size="small"
                placeholder="... "
                value={data.operationHistory}
                onChange={(e) => handleFieldChange('operationHistory', e.target.value)}
              />              
              </Form.Item>
              </Col>
          </Row>
          </Col>
        </Row>
      </Card>

        <Form.Item label="全身冷热和出汗情况">

        <Card>
          <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item label="冷热情况？">
              <Radio.Group
                
                value={data.coldOrHot}
                options={[
                  {value:"怕冷",label:"怕冷"},
                  {value:"怕热",label:"怕热"},
                  {value:"手冷",label:"手冷"},
                  {value:"足冷",label:"足冷"}

                  ]}
                onChange={(e) => handleFieldChange('coldOrHot', e.target.value)} 
              />
            </Form.Item>
           </Col> 
          <Col xs={24} md={12}>
            <Form.Item label="程度？">
              <Radio.Group 
                onChange={(e) => handleFieldChange('coldOrHotExtent', e.target.value)} 
                value={data.coldOrHotExtent}
                options={[
                  {value:"很少",label:"很少"},
                  {value:"一般",label:"一般"},
                  {value:"中等",label:"中等"},
                  {value:"非常",label:"非常"}
                  ]}
              />
            </Form.Item>
          </Col>
          </Row>
          <Row gutter={16}>
          <Col xs={24} md={8}>
            <Form.Item label="有无出汗？">
              <Radio.Group 
                onChange={(e) => handleFieldChange('sweatOrNot', e.target.value)} 
                value={data.sweatOrNot}
                options={[
                  {value:"有",label:"有"},
                  {value:"无",label:"无"}
                  ]}
              />
            </Form.Item>
           </Col> 
          <Col xs={24} md={8}>
            <Form.Item label="程度？">
              <Radio.Group 
                onChange={(e) => handleFieldChange('sweatExtent', e.target.value)} 
                value={data.sweatExtent}
                options={[
                  {value:"这几年基本不出汗",label:"这几年基本不出汗"},
                  {value:"正常出汗",label:"正常出汗"},
                  {value:"动辄出汗",label:"动辄出汗"}
                  ]}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item label="汗出时间？">
              <Radio.Group 
                onChange={(e) => handleFieldChange('sweatTime', e.target.value)} 
                value={data.sweatTime}
                options={[
                  {value:"早上",label:"早上"},
                  {value:"傍晚",label:"傍晚"},
                  {value:"夜晚",label:"夜晚"}
                  ]}
              />
            </Form.Item>
          </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item label="汗后怕风？">
                  <Radio.Group 
                    onChange={(e) => handleFieldChange('sweatFearWind', e.target.value)} 
                    value={data.sweatFearWind}
                    options={[
                    {value:"是",label:"是"},
                    {value:"否",label:"否"}
                    ]}
                  />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="出汗量？">
                  <Radio.Group 
                    onChange={(e) => handleFieldChange('sweatAmount', e.target.value)} 
                    value={data.sweatAmount}
                    options={[
                    {value:"很少",label:"很少"},
                    {value:"一般",label:"一般"},
                    {value:"很多",label:"很多"}
                    ]}
                  />
              </Form.Item>
            </Col>
          </Row>
        </Card>
        </Form.Item>


        <Form.Item label="呼吸情况">
          <Card>
          <Row gutter={16}>
            <Col xs={24} md={8}>
              <Form.Item label="鼻塞？">
                  <Radio.Group 
                    onChange={(e) => handleFieldChange('noseStuff', e.target.value)} 
                    value={data.noseStuff}
                    options={[
                    {value:"有",label:"有"},
                    {value:"无",label:"无"}
                    ]}
                  />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item label="打呼噜？">
                  <Radio.Group 
                    onChange={(e) => handleFieldChange('snorkling', e.target.value)} 
                    value={data.snorkling}
                    options={[
                    {value:"多年",label:"多年"},
                    {value:"最近有",label:"最近有"},
                    {value:"无",label:"无"}
                    
                    ]}
                  />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item label="呼吸暂停？">
                  <Radio.Group 
                    value={data.inhalePalse}
                    onChange={(e) => handleFieldChange('inhalePalse', e.target.value)} 
                    options={[
                      {value:'有',label:'有'},
                      {value:'无',label:'无'}
                      ]}
                  />
              </Form.Item>
            </Col>
          </Row>
          </Card>
        </Form.Item>  


        <Form.Item label="头痛、身痛">
          <Card>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item label="疼痛部位:">
                <Checkbox.Group options={painPartOptions} Value={data.painPart} onChange={(value) => handleFieldChange('painPart', value)} />             
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
            {!data.painPart||data.painPart.length===0?
              <></>
              :
              <Form.Item label="疼痛程度:">
                <Radio.Group
                    value={data.painExtent}
                    onChange={(e) => handleFieldChange('painExtent', e.target.value)} 
                    options={[
                      {value:'轻度',label:'轻度'},
                      {value:'中度',label:'中度'},
                      {value:'重度',label:'重度'},
                      {value:'严重',label:'严重'}
                      ]}
                  />
              </Form.Item>
            }
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item label="痛感类型:">
                <Checkbox.Group options={painKindOptions} value={data.painKind} onChange={(value) => handleFieldChange('painKind', value)} />             
              </Form.Item>
            </Col>
          </Row>
        </Card>
        </Form.Item>

        <Form.Item label="胸胁、腹部、腰膝、饮食情况">
          <Card>
          <Row gutter={16} >
            
            <Col xs={24} md={4}>
              <Form.Item label="胸肋痛:">
                <Radio.Group 
                    value={data.chestPain}
                    onChange={(e) => handleFieldChange('chestPain', e.target.value)} 
                    options={[
                      {value:'是',label:'是'},
                      {value:'否',label:'否'}
                      ]}
                  />
              </Form.Item>
            </Col>
            <Col xs={24} md={4}>
              <Form.Item label="腹痛:">
                <Radio.Group 
                    value={data.bellyPain}
                    onChange={(e) => handleFieldChange('bellyPain', e.target.value)} 
                    options={[
                      {value:'是',label:'是'},
                      {value:'否',label:'否'}
                      ]}
                  />
              </Form.Item>
            </Col>
            <Col xs={24} md={4}>
              <Form.Item label="肚子凉:">
                <Radio.Group 
                    value={data.bellyCold}
                    onChange={(e) => handleFieldChange('bellyCold', e.target.value)} 
                    options={[
                      {value:'是',label:'是'},
                      {value:'否',label:'否'}
                      ]}
                  />
              </Form.Item>
            </Col>
            <Col xs={24} md={4}>
              <Form.Item label="小腹重坠:">
                <Radio.Group 
                    value={data.bellyHeavy}
                    onChange={(e) => handleFieldChange('bellyHeavy', e.target.value)} 
                    options={[
                      {value:'是',label:'是'},
                      {value:'否',label:'否'}
                      ]}
                  />
              </Form.Item>
            </Col>
            
          </Row>
          
          <Row gutter={16}>
            <Col xs={24} md={4}>
              <Form.Item label="腰膝怕冷:">
                <Radio.Group 
                    value={data.waistFearCold}
                    onChange={(e) => handleFieldChange('waistFearCold', e.target.value)} 
                    options={[
                      {value:'是',label:'是'},
                      {value:'否',label:'否'}
                      ]}
                  />
              </Form.Item>
            </Col>
            <Col xs={24} md={4}>
              <Form.Item label="腰膝酸软:">
                <Radio.Group 
                    value={data.waistSour}
                    onChange={(e) => handleFieldChange('waistSour', e.target.value)} 
                    options={[
                      {value:'是',label:'是'},
                      {value:'否',label:'否'}
                      ]}
                  />
              </Form.Item>
            </Col>
            <Col xs={24} md={4}>
              <Form.Item label="腰沉:">
                <Radio.Group 
                    value={data.waistHeavy}
                    onChange={(e) => handleFieldChange('waistHeavy', e.target.value)} 
                    options={[
                      {value:'是',label:'是'},
                      {value:'否',label:'否'}
                      ]}
                  />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} md={24}>
              <Form.Item label="胃部感觉">
                <Checkbox.Group options={stomachFeelingOptions} defaultValue={[]} onChange={(value) => handleFieldChange('stomachFeeling', value)} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} md={8}>
              <Form.Item label="食欲:">
                <Radio.Group 
                    value={data.appetite}
                    onChange={(e) => handleFieldChange('appetite', e.target.value)} 
                    options={[
                      {value:'差',label:'差'},
                      {value:'一般',label:'一般'},
                      {value:'很好',label:'很好'}
                      ]}
                  />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item label="饮食量:">
                <Radio.Group 
                    value={data.intake}
                    onChange={(e) => handleFieldChange('intake', e.target.value)} 
                    options={[
                      {value:'很少',label:'很少'},
                      {value:'一般',label:'一般'},
                      {value:'中等',label:'中等'},
                      {value:'很多',label:'很多'}
                      ]}
                  />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item label="饮食喜好:">
                <Radio.Group 
                    value={data.intakePreference}
                    onChange={(e) => handleFieldChange('intakePreference', e.target.value)} 
                    options={[
                      {value:'喜冷',label:'喜冷'},
                      {value:'喜热',label:'喜热'},
                      {value:'偏甜',label:'偏甜'},
                      {value:'偏咸',label:'偏咸'},
                      {value:'偏辣',label:'偏辣'}
                      ]}
                  />
              </Form.Item>
            </Col>

          </Row>
        </Card>
        </Form.Item>

        <Form.Item label="口中感觉、饮水情况">
          <Card>
          <Row gutter={16}>
            <Col xs={24} md={8}>
              <Form.Item label="口中感觉:">
                <Select 
                    onChange={(value) => handleFieldChange('mouthFeeling', value)} 
                    value={data.mouthFeeling}
                  >
                    <Option value="口干">口干</Option>
                    <Option value="口苦">口苦</Option>
                    <Option value="口咸">口咸</Option>
                    <Option value="口淡">口淡</Option>
                    <Option value="仅晨起口苦">仅晨起口苦</Option>
                    <Option value="仅睡前口干">仅睡前口干</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item label="饮水情况:">
                <Radio.Group 
                    value={data.drinking}
                    onChange={(e) => handleFieldChange('drinking', e.target.value)} 
                    options={[
                      {value:'喜饮',label:'喜饮'},
                      {value:'不喜饮',label:'不喜饮'},
                      {value:'喜冷饮',label:'喜冷饮'},
                      {value:'喜热饮',label:'喜热饮'}
                      ]}
                  />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item label="咽喉情况:">
                <Radio.Group 
                    value={data.throat}
                    onChange={(e) => handleFieldChange('throat', e.target.value)} 
                    options={[
                      {value:'咽干',label:'咽干'},
                      {value:'咽痛',label:'咽痛'},
                      {value:'无',label:'无'}
                      ]}
                  />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} md={24}>
              <Form.Item label="痰的情况:">
                <Checkbox.Group options={phlegmOptions} defaultValue={[]} onChange={(value) => handleFieldChange('phlegm', value)} />
              </Form.Item>
            </Col>
          </Row>
        </Card>
        </Form.Item>

        <Form.Item label="大小便">
          <Card>
          <Row gutter={16}>
            <Col xs={24} md={4}>
              <Form.Item label="每日大便次数:">
                <InputNumber
                size="small"
                style={{ width: '100%' }}
                placeholder="?次"
                min={0}
                max={10}
                value={data.shitTimes}
                onChange={(value) => handleFieldChange('shitTimes', value || 0)}
              />
              </Form.Item>
            </Col>
            <Col xs={24} md={4}>
              <Form.Item label="形状:">
                <Select 
                    onChange={(value) => handleFieldChange('shitShape', value)} 
                  >
                    <Option value="正常">正常</Option>
                    <Option value="不成形">不成形</Option>
                    <Option value="偏干">偏干</Option>
                    <Option value="偏稀">偏稀</Option>
                    <Option value="先干后稀">先干后稀</Option>

                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={4}>
              <Form.Item label="颜色:">
                <DynamicSelect 
                    onChange={(value) => handleFieldChange('shitColor', value)} 
                    initialOptions={['绿色','深黄','黑色','红色','橘皮色','白色','白色粘液','白色奶酪样']}
                  >
                </DynamicSelect>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} md={4}>
              <Form.Item label="小便">
                <Radio.Group 
                    value={data.peeMoreOrLess}
                    onChange={(e) => handleFieldChange('peeMoreOrLess', e.target.value)} 
                    options={[
                      {value:'多',label:'多'},
                      {value:'少',label:'少'}
                      ]}
                  />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item label="伴随症状:">
                <Checkbox.Group options={peeSymptomOptions} defaultValue={[]} onChange={(value) => handleFieldChange('peeSymptom', value)} />
              </Form.Item>
            </Col>
            <Col xs={24} md={4}>
              <Form.Item label="夜尿次数:">
                  <InputNumber
                  size="small"
                  style={{ width: '100%' }}
                  placeholder="?次"
                  min={0}
                  max={10}
                  value={data.peeTimes}
                  onChange={(value) => handleFieldChange('peeTimes', value || 0)}
                />
                </Form.Item>
            </Col>
            <Col xs={24} md={4}>
              <Form.Item label="小便颜色:">
                <DynamicSelect 
                    onChange={(value) => handleFieldChange('peeColor', value)} 
                    initialOptions={['正常','青','黄','红','乳白']}
                  >
                </DynamicSelect>
              </Form.Item>
            </Col>
          </Row>
          </Card>
        </Form.Item>


        <Form.Item label='其他情况'>
          <Card>
          <Row gutter={16}>
            <Col xs={24} md={4}>
              <Form.Item label="心慌">
                <Radio.Group 
                    value={data.panic}
                    onChange={(e) => handleFieldChange('panic', e.target.value)} 
                    options={[
                      {value:'有',label:'有'},
                      {value:'无',label:'无'}
                      ]}
                  />
              </Form.Item>
            </Col>
            <Col xs={24} md={4}>
              <Form.Item label="胸闷气短">
                <Radio.Group 
                    value={data.shortBreath}
                    onChange={(e) => handleFieldChange('shortBreath', e.target.value)} 
                    options={[
                      {value:'有',label:'有'},
                      {value:'无',label:'无'}
                      ]}
                  />
              </Form.Item>
            </Col>
            <Col xs={24} md={4}>
              <Form.Item label="眼干涩">
                <Radio.Group 
                    value={data.dryEye}
                    onChange={(e) => handleFieldChange('dryEye', e.target.value)} 
                    options={[
                      {value:'有',label:'有'},
                      {value:'无',label:'无'}
                      ]}
                  />
              </Form.Item>
            </Col>
            <Col xs={24} md={4}>
              <Form.Item label="脾气暴躁易怒">
                <Radio.Group 
                    value={data.easyAngry}
                    onChange={(e) => handleFieldChange('easyAngry', e.target.value)} 
                    options={[
                      {value:'有',label:'有'},
                      {value:'无',label:'无'}
                      ]}
                  />
              </Form.Item>
            </Col>
            <Col xs={24} md={4}>
              <Form.Item label="最近有无感冒">
                <Radio.Group 
                    value={data.recentCold}
                    onChange={(e) => handleFieldChange('recentCold', e.target.value)} 
                    options={[
                      {value:'有',label:'有'},
                      {value:'无',label:'无'}
                      ]}
                  />
              </Form.Item>
            </Col>
          </Row>
          </Card>
        </Form.Item>
        {isFemale?(
        <Form.Item label='月经情况'>
          <Row gutter={16}>
            <Col xs={24} md={4}>
              <Form.Item label="月经周期">
                <Radio.Group 
                    value={data.menstruationPeriod}
                    onChange={(e) => handleFieldChange('menstruationPeriod', e.target.value)} 
                    options={[
                      {value:'正常',label:'正常'},
                      {value:'提前',label:'提前'},
                      {value:'延后',label:'延后'}
                      ]}
                  />
              </Form.Item>
            </Col>
            <Col xs={24} md={4}>
              <Form.Item label="血块">
                <Radio.Group 
                    value={data.menstruationBlock}
                    onChange={(e) => handleFieldChange('menstruationBlock', e.target.value)} 
                    options={[
                      {value:'有',label:'有'},
                      {value:'无',label:'无'}
                      ]}
                  />
              </Form.Item>
            </Col>
            <Col xs={24} md={4}>
              <Form.Item label="经量">
                <Radio.Group 
                    value={data.menstruationAmount}
                    onChange={(e) => handleFieldChange('menstruationAmount', e.target.value)} 
                    options={[
                      {value:'正常',label:'正常'},
                      {value:'多',label:'多'},
                      {value:'少',label:'少'}
                      ]}
                  />
              </Form.Item>
            </Col>
            <Col xs={24} md={4}>
              <Form.Item label="痛经">
                <Radio.Group 
                    value={data.menstruationPain}
                    onChange={(e) => handleFieldChange('menstruationPain', e.target.value)} 
                    options={[
                      {value:'有',label:'有'},
                      {value:'无',label:'无'}
                      ]}
                  />
              </Form.Item>
            </Col>
            <Col xs={24} md={4}>
              <Form.Item label="白带">
                <Radio.Group 
                    value={data.menstruationWhiteBelt}
                    onChange={(e) => handleFieldChange('menstruationWhiteBelt', e.target.value)} 
                    options={[
                      {value:'多',label:'多'},
                      {value:'少',label:'少'},
                      {value:'无',label:'无'}
                      ]}
                  />
              </Form.Item>
            </Col>
            <Col xs={24} md={4}>
              <Form.Item label="白带颜色">
                <Radio.Group 
                    value={data.menstruationWhiteBeltColor}
                    onChange={(e) => handleFieldChange('menstruationWhiteBeltColor', e.target.value)} 
                    options={[
                      {value:'黄',label:'黄'},
                      {value:'白',label:'白'},
                      {value:'赤',label:'赤'}
                      ]}
                  />
              </Form.Item>
            </Col>
            <Col xs={24} md={4}>
              <Form.Item label="气味">
                <Radio.Group 
                    value={data.menstruationOdor}
                    onChange={(e) => handleFieldChange('menstruationOdor', e.target.value)} 
                    options={[
                      {value:'正常',label:'正常'},
                      {value:'腥',label:'腥'},
                      {value:'臭',label:'臭'}
                      ]}
                  />
              </Form.Item>
            </Col>
            <Col xs={24} md={4}>
              <Form.Item label="颜色:">
                <DynamicSelect 
                    onChange={(value) => handleFieldChange('menstruationColor',value)} 
                    initialOptions={['深红','黯暗','鲜红','淡红','浓稠','清稀']}
                  >
                </DynamicSelect>
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>
        ):(<></>)}


      </Form>
    </div>
  
  )};

export default MedicalHistoryStep;