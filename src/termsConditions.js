import React, { PureComponent } from 'react';
import { ListView, View, Text,YellowBox, StyleSheet, Image,ToastAndroid, AsyncStorage,TouchableOpacity, TouchableHighlight, StatusBar, ScrollView } from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import HTMLView from 'react-native-htmlview';


export default class TermConditions extends PureComponent{
static navigationOptions =({navigation})=>({
    title: 'Terms & Conditions',
    headerTintColor: 'white',
    
    headerStyle: {
      backgroundColor: '#51c0c3'
    },
    statusBarStyle: 'light-content',
    headerRight: <View style={{flex:1,flexDirection:'row'}}>
                  <TouchableOpacity onPress={()=>navigation.navigate('Search')}>
                    <Text style={{color:'white',paddingLeft:20,padding:5,fontFamily:'WhitneyMedium',fontSize:18}}>
                      <FontAwesome>{Icons.search}</FontAwesome>
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>navigation.navigate('Wishlist')}>
                    <Text style={{color:'white',paddingLeft:20,padding:5,fontFamily:'WhitneyMedium',fontSize:18}}>
                      <FontAwesome>{Icons.heart}</FontAwesome>
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>navigation.navigate('Cart')}>
                  <View>
                  {typeof (navigation.state.params) === 'undefined' || typeof (navigation.state.params.cartCount) === 'undefined' ? <Text style={{position:'absolute'}}></Text> : navigation.state.params.cartCount}
                    <Text style={{color:'white',paddingLeft:20,padding:5,paddingRight:20, fontFamily:'WhitneyMedium', fontSize:18}}>
                      <FontAwesome>{Icons.shoppingBag}</FontAwesome>
                    </Text>
                  </View>
                  </TouchableOpacity>
                </View>
  })

  render(){
    return(<ScrollView>
        <View style={styles.container}>
            <StatusBar
            backgroundColor="#51c0c3"
            barStyle="light-content"
            />
            <View style={{ padding:20,marginTop:10}}>
                <HTMLView
                value={HtmlData}
                />
        
            </View>
        </View>
    </ScrollView>);
  }
}

const styles = StyleSheet.create({ 
    container: {
        padding: 0,
        flex:1,
      },
      badge:{
        position:'absolute',
        backgroundColor:'red',
        height:20,
        textAlign:'center',
        color:'white',
        width:20,
        borderRadius:50,
        right:10,
        top:0,
        zIndex:99,
      },
      title:{
          fontSize:20,
          fontWeight:'bold'
          ,marginBottom:20
        },
        textStyle:{
            marginBottom:10
        }
});

const HtmlData =`<h3>TERMS & CONDITIONS</h3><h5>Introduction</h5><p>These terms and conditions govern your use of the website www.weguarantee.in, by using this website, you accept these terms and conditions in full.  If you disagree with these terms and conditions or any part of these terms and conditions, you may discontinue to use this website.

You must be at least 18 years of age to use this website. By using this website and by agreeing to these terms and conditions you warrant and represent that you are at least 18 years of age.</p><h5>User Account & Registration</h5><p>The account and password has to be confidential and it will be maintained by the user, user will be fully responsible for all the activities taking place under his/her account.

<b>Weguarentee</b> may disable your user ID and password in <b>Weguarentee’s</b> sole discretion without notice or explanation.</p><h5>Payment</h5><p>Payment can be made by Credit cards, Debit cards, Net Banking, cash on delivery as per the options available with the product that you want to purchase. You must use your own credit cards and Debit cards. Weguarantee will not be liable for any credit or debit cards fraud. The liability to use a card fraudulently will be on the user and the owners to ‘prove otherwise’ shall be exclusively on the user.</p><h5>Delivery & Returns</h5><p>Delivery details is available at our shipping and delivery page. Please be aware that these charges can change at anytime and that all delivery charges are non-refundable.

We can only accept returns for faulty goods not for unwanted items. All damages must be reported immediately. Please keep the broken items or provide photographic evidence of damage or we cannot accept responsibility for any claims made.</p><h5>License to use website</h5><p>Unless otherwise stated, Weguarentee and/or its licensors own the intellectual property rights in the website and material on the website.  Subject to the license below, all these intellectual property rights are reserved.

You may view, download for caching purposes only, and print pages or other content from the website for your own personal use, subject to the restrictions set out below and elsewhere in these terms and conditions.

You must not:</p><ul><li>Republish material from this website including republication on another website</li>
<li>Sell, rent or sub-license material from the website</li>
<li>Show any material from the website in public</li>
<li>Reproduce, duplicate, copy or otherwise exploit material on this website for a commercial purpose</li>
<li>Edit or otherwise modify any material on the website; or</li>
<li>Redistribute material from this website except for content specifically and expressly made available for redistribution.</li></ul><p>Where content is specifically made available for redistribution, it may only be redistributed within your organisation.</p><h5>Acceptable use</h5><p>You must not use this website in any way that causes, or may cause, damage to the website or impairment of the availability or accessibility of the website, or in any way which is unlawful, illegal, fraudulent or harmful, or in connection with any unlawful, illegal, fraudulent or harmful purpose or activity.

You must not use this website to copy, store, host, transmit, send, use, publish or distribute any material which consists of (or is linked to) any spyware, computer virus, Trojan horse, worm, keystroke logger, rootkit or other malicious computer software.

You must not conduct any systematic or automated data collection activities (including without limitation scraping, data mining, data extraction and data harvesting) on or in relation to this website without Weguarentee’s express written consent.

You must not use this website to transmit or send unsolicited commercial communications.

You must not use this website for any purposes related to marketing without Weguarentee’s express written consent.</p><h5>Restricted access</h5><p>Access to certain areas of this website is restricted. Weguarentee reserves the right to restrict access to other areas of this website, or indeed this entire website, at Weguarentee’s discretion.</p><h5>User content</h5><p>In these terms and conditions, “your user content” means material (including without limitation text, images, audio material, video material and audio-visual material) that you submit to this website, for whatever purpose.

You grant to Weguarentee a worldwide, irrevocable, non-exclusive, royalty-free license to use, reproduce, adapt, publish, translate and distribute your user content in any existing or future media.  You also grant to Weguarentee the right to sub-license these rights, and the right to bring an action for infringement of these rights.

Your user content must not be illegal or unlawful, must not infringe any third party’s legal rights, and must not be capable of giving rise to legal action whether against you or Weguarentee or a third party (in each case under any applicable law).

You must not submit any user content to the website that is or has ever been the subject of any threatened or actual legal proceedings or other similar complaint.
Weguarentee reserves the right to edit or remove any material submitted to this website, or stored on our servers, or hosted or published upon this website.

[Notwithstanding Weguarentee’s rights under these terms and conditions in relation to user content, [NAME] does not undertake to monitor the submission of such content to, or the publication of such content on, this website.]</p><h5>No warranties</h5><p>This websiteis provided “as is” without any representations or warranties, express or implied.  Weguarentee makes no representations or warranties in relation to this website or the information and materials provided on this website.

Without prejudice to the generality of the foregoing paragraph, Weguarentee does not warrant that:</p>
<ul><li>this website will be constantly available, or available at all; or</li>
<li>the information on this website is complete, true, accurate or non-misleading.</li></ul><p>Nothing on this website constitutes, or is meant to constitute, advice of any kind. If you require advice in relation to any legal, financial or medical matter you should consult an appropriate professional.</p><h5>Limitations of liability</h5><p>Weguarentee will not be liable to you whether under the law of contact, the law of torts or otherwise in relation to the contents of, or use of, or otherwise in connection with, this website:</p><ul><li>To the extent that the website is provided free-of-charge, for any direct loss;</li>
<li>For any indirect, special or consequential loss; or</li>
<li>For any business losses, loss of revenue, income, profits or anticipated savings, loss of contracts or business relationships, loss of reputation or goodwill, or loss or corruption of information or data.</li><p>These limitations of liability apply even if Weguarentee has been expressly advised of the potential loss.</p><h5>Other parties</h5><p>You accept that, as a limited liability entity, Weguarentee has an interest in limiting the personal liability of its officers and employees.  You agree that you will not bring any claim personally against [NAME’S] officers or employees in respect of any losses you suffer in connection with the website.

Without prejudice to the foregoing paragraph, you agree that the limitations of warranties and liability set out in this website disclaimer will protect Weguarentee officers, employees, agents, subsidiaries, successors, assigns and sub-contractors as well as Weguarentee.<p><h5>Unenforceable provisions</h5><p>If any provision of this website disclaimer is, or is found to be, unenforceable under applicable law, that will not affect the enforceability of the other provisions of this website disclaimer.<p><h5>Indemnity</h5>
<p>You hereby indemnify Weguarentee and undertake to keep NAME indemnified against any losses, damages, costs, liabilities and expenses including without limitation legal expenses and any amounts paid by NAME to a third party in settlement of a claim or dispute on the advice of Weguarentee’slegal advisersincurred or suffered by Weguarentee arising out of any breach by you of any provision of these terms and conditions, or arising out of any claim that you have breached any provision of these terms and conditions.</p><h5>Breaches of these terms and conditions</h5><p>Without prejudice to Weguarentee’s other rights under these terms and conditions, if you breach these terms and conditions in any way, Weguarentee may take such action as Weguarentee deems appropriate to deal with the breach, including suspending your access to the website, prohibiting you from accessing the website, blocking computers using your IP address from accessing the website, contacting your internet service provider to request that they block your access to the website and/or bringing court proceedings against you.</p><h5>Variation</h5><p>Weguarentee may revise these terms and conditions from time-to-time.  Revised terms and conditions will apply to the use of this website from the date of the publication of the revised terms and conditions on this website.  Please check this page regularly to ensure you are familiar with the current version.</p><h5>Assignment</h5><p>Weguarentee may transfer, sub-contract or otherwise deal with Weguarentee’s rights and/or obligations under these terms and conditions without notifying you or obtaining your consent.

You may not transfer, sub-contract or otherwise deal with your rights and/or obligations under these terms and conditions.</p><h5>Entire agreement</h5><p>These terms and conditions, together, constitute the entire agreement between you and Weguarentee in relation to your use of this website, and supersede all previous agreements in respect of your use of this website.</p><h5>Law and jurisdiction</h5><p>These terms and conditions will be governed by and construed in accordance with GOVERNING LAW, and any disputes relating to these terms and conditions will be subject to the non-exclusive jurisdiction of the courts of jurisdiction at Lucknow, Uttar Pradesh.</p><h5>Comments or Questions</h5><p>If you have any questions, comments or concerns arising from the website or any other relevant terms and conditions, policies and notices contact us at info@weguarantee.in</p>
`;