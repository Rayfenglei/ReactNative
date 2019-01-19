package com.todaynews;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

public class RNActivity extends AppCompatActivity implements View.OnClickListener{

    private Button button;
    private TextView textView;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_rn);
        init();
        textView.setText(OpenAndroidModule.msg);
    }
    private void init(){
        textView = findViewById(R.id.text);
        button=findViewById(R.id.button);
        button.setOnClickListener(this);
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()){
            case R.id.button :
                startActivity(new Intent(this,MainActivity.class));
                break;
            default:
                break;
        }
    }
}
