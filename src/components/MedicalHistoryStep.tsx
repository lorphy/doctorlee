import React from 'react';
import { Form, Input, Row, Col,Checkbox,Select,InputNumber,Radio } from 'antd';
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
    alert (JSON.stringify({ [field]: value }));
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

        <Form.Item label="全身冷热和出汗情况">
          <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item label="冷热情况？">
              <Radio.Group
                
                default={data.coldOrHot}
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
                default={data.coldOrHotExtent}
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
              <Select 
                onChange={(value) => handleFieldChange('sweatOrNot', value)} 
              >
                <Option value="有">有</Option>
                <Option value="无">无</Option>
              </Select>
            </Form.Item>
           </Col> 
          <Col xs={24} md={8}>
            <Form.Item label="程度？">
              <Select 
                onChange={(value) => handleFieldChange('sweatExtent', value)} 
              >
                <Option value="这几年基本不出汗">这几年基本不出汗</Option>
                <Option value="正常出汗">正常出汗</Option>
                <Option value="动辄出汗">动辄出汗</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item label="汗出时间？">
              <Select 
                onChange={(value) => handleFieldChange('sweatTime', value)} 
              >
                <Option value="早上">早上</Option>
                <Option value="傍晚">傍晚</Option>
                <Option value="夜晚">夜晚</Option>
              </Select>
            </Form.Item>
          </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item label="汗后怕风？">
                  <Select 
                    onChange={(value) => handleFieldChange('sweatFearWind', value)} 
                  >
                    <Option value="是">是</Option>
                    <Option value="否">否</Option>
                  </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="出汗量？">
                  <Select 
                    onChange={(value) => handleFieldChange('sweatAmount', value)} 
                  >
                    <Option value="很少">很少</Option>
                    <Option value="一般">一般</Option>
                    <Option value="很多">很多</Option>
                  </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>


        <Form.Item label="呼吸情况">
          <Row gutter={16}>
            <Col xs={24} md={8}>
              <Form.Item label="鼻塞？">
                  <Select 
                    onChange={(value) => handleFieldChange('noseStuff', value)} 
                  >
                    <Option value="有">有</Option>
                    <Option value="无">无</Option>
                  </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item label="打呼噜？">
                  <Select 
                    onChange={(value) => handleFieldChange('snorkling', value)} 
                  >
                    <Option value="多年">多年</Option>
                    <Option value="最近有">最近有</Option>
                    <Option value="最近有">无</Option>
                  </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item label="呼吸暂停？">
                  <Radio.Group 
                    onChange={(value) => handleFieldChange('inhalePalse', value)} 
                    options={[
                      {value:'有',label:'有'},
                      {value:'无',label:'无'}
                      ]}
                  />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>  


        <Form.Item label="头痛、身痛">
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item label="疼痛部位:">
                <Checkbox.Group options={painPartOptions} defaultValue={[]} onChange={(value) => handleFieldChange('painPart', value)} />             
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
            {!data.painPart||data.painPart.length===0?
              <></>
              :
              <Form.Item label="疼痛程度:">
                <Select 
                    onChange={(value) => handleFieldChange('painExtent', value)} 
                  >
                    <Option value="轻度">轻度</Option>
                    <Option value="中度">中度</Option>
                    <Option value="重度">重度</Option>
                    <Option value="严重">严重</Option>
                </Select>
              </Form.Item>
            }
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item label="痛感类型:">
                <Checkbox.Group options={painKindOptions} defaultValue={[]} onChange={(value) => handleFieldChange('painKind', value)} />             
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item label="胸胁、腹部、腰膝、饮食情况">
          <Row gutter={16}>
            <Col xs={24} md={4}>
              <Form.Item label="胸肋痛:">
                <Select 
                    onChange={(value) => handleFieldChange('chestPain', value)} 
                  >
                    <Option value="是">是</Option>
                    <Option value="否">否</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={4}>
              <Form.Item label="腹痛:">
                <Select 
                    onChange={(value) => handleFieldChange('bellyPain', value)} 
                  >
                    <Option value="是">是</Option>
                    <Option value="否">否</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={4}>
              <Form.Item label="肚子凉:">
                <Select 
                    onChange={(value) => handleFieldChange('bellyCold', value)} 
                  >
                    <Option value="是">是</Option>
                    <Option value="否">否</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={4}>
              <Form.Item label="小腹重坠:">
                <Select 
                    onChange={(value) => handleFieldChange('bellyHeavy', value)} 
                  >
                    <Option value="是">是</Option>
                    <Option value="否">否</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} md={4}>
              <Form.Item label="腰膝怕冷:">
                <Select 
                    onChange={(value) => handleFieldChange('waistFearCold', value)} 
                  >
                    <Option value="是">是</Option>
                    <Option value="否">否</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={4}>
              <Form.Item label="腰膝酸软:">
                <Select 
                    onChange={(value) => handleFieldChange('waistSour', value)} 
                  >
                    <Option value="是">是</Option>
                    <Option value="否">否</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={4}>
              <Form.Item label="腰沉:">
                <Select 
                    onChange={(value) => handleFieldChange('waistHeavy', value)} 
                  >
                    <Option value="是">是</Option>
                    <Option value="否">否</Option>
                </Select>
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
            <Col xs={24} md={4}>
              <Form.Item label="食欲:">
                <Select 
                    onChange={(value) => handleFieldChange('appetite', value)} 
                  >
                    <Option value="差">差</Option>
                    <Option value="一般">一般</Option>
                    <Option value="很好">很好</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={4}>
              <Form.Item label="饮食量:">
                <Select 
                    onChange={(value) => handleFieldChange('intake', value)} 
                  >
                    <Option value="很少">很少</Option>
                    <Option value="一般">一般</Option>
                    <Option value="中等">中等</Option>
                    <Option value="很多">很多</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={4}>
              <Form.Item label="饮食喜好:">
                <Select 
                    onChange={(value) => handleFieldChange('intakePreference', value)} 
                  >
                    <Option value="喜冷">喜冷</Option>
                    <Option value="喜热">喜热</Option>
                    <Option value="偏甜">偏甜</Option>
                    <Option value="偏咸">偏咸</Option>
                    <Option value="偏辣">偏辣</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item label="口中感觉、饮水情况">
          <Row gutter={16}>
            <Col xs={24} md={4}>
              <Form.Item label="口中感觉:">
                <Select 
                    onChange={(value) => handleFieldChange('mouthFeeling', value)} 
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
            <Col xs={24} md={4}>
              <Form.Item label="饮水情况:">
                <Select 
                    onChange={(value) => handleFieldChange('drinking', value)} 
                  >
                    <Option value="喜饮">喜饮</Option>
                    <Option value="不喜饮">不喜饮</Option>
                    <Option value="喜冷饮">喜冷饮</Option>
                    <Option value="喜热饮">喜热饮</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={4}>
              <Form.Item label="咽喉情况:">
                <Select 
                    onChange={(value) => handleFieldChange('throat', value)} 
                  >
                    <Option value="咽干">咽干</Option>
                    <Option value="咽痛">咽痛</Option>
                </Select>
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
        </Form.Item>

        <Form.Item label="大小便">
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
              <Select 
                    onChange={(value) => handleFieldChange('peeMoreOrLess', value)} 
                  >
                    <Option value="多">多</Option>
                    <Option value="少">少</Option>

                </Select>
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
        </Form.Item>


        <Form.Item label='其他情况'>
          <Row gutter={16}>
            <Col xs={24} md={4}>
              <Form.Item label="心慌">
              <Select 
                    onChange={(value) => handleFieldChange('panic', value)} 
                  >
                    <Option value="有">有</Option>
                    <Option value="无">无</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={4}>
              <Form.Item label="胸闷气短">
                <Select 
                    onChange={(value) => handleFieldChange('shortBreath', value)} 
                  >
                    <Option value="有">有</Option>
                    <Option value="无">无</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={4}>
              <Form.Item label="眼干涩">
                <Select 
                    onChange={(value) => handleFieldChange('dryEye', value)} 
                  >
                    <Option value="有">有</Option>
                    <Option value="无">无</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={4}>
              <Form.Item label="脾气暴躁易怒">
                <Select 
                    onChange={(value) => handleFieldChange('easyAngry', value)} 
                  >
                    <Option value="有">有</Option>
                    <Option value="无">无</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={4}>
              <Form.Item label="最近有无感冒">
                <Select 
                    onChange={(value) => handleFieldChange('recentCold', value)} 
                  >
                    <Option value="有">有</Option>
                    <Option value="无">无</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>
        {isFemale?(
        <Form.Item label='月经情况'>
          <Row gutter={16}>
            <Col xs={24} md={4}>
              <Form.Item label="月经周期">
              <Select 
                    onChange={(value) => handleFieldChange('menstruationPeriod', value)} 
                  >
                    <Option value="正常">正常</Option>
                    <Option value="提前">提前</Option>
                    <Option value="延后">延后</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={4}>
              <Form.Item label="血块">
                <Select 
                    onChange={(value) => handleFieldChange('menstruationBlock', value)} 
                  >
                    <Option value="有">有</Option>
                    <Option value="无">无</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={4}>
              <Form.Item label="经量">
                <Select 
                    onChange={(value) => handleFieldChange('menstruationAmount', value)} 
                  >
                    <Option value="正常">正常</Option>
                    <Option value="多">多</Option>
                    <Option value="少">少</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={4}>
              <Form.Item label="痛经">
                <Select 
                    onChange={(value) => handleFieldChange('menstruationPain', value)} 
                  >
                    <Option value="有">有</Option>
                    <Option value="无">无</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={4}>
              <Form.Item label="白带">
                <Select 
                    onChange={(value) => handleFieldChange('menstruationWhiteBelt', value)} 
                  >
                    <Option value="有">有</Option>
                    <Option value="无">无</Option>
                    <Option value="多">多</Option>
                    <Option value="少">少</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={4}>
              <Form.Item label="白带颜色">
                <Select 
                    onChange={(value) => handleFieldChange('menstruationWhiteBeltColor', value)} 
                  >
                    <Option value="黄">黄</Option>
                    <Option value="白">白</Option>
                    <Option value="赤">赤</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={4}>
              <Form.Item label="气味">
                <Select 
                    onChange={(value) => handleFieldChange('menstruationOdor', value)} 
                  >
                    <Option value="正常">正常</Option>
                    <Option value="腥">腥</Option>
                    <Option value="臭">臭</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={4}>
              <Form.Item label="颜色:">
                <DynamicSelect 
                    onChange={(value) => handleFieldChange('menstruationColor', value)} 
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